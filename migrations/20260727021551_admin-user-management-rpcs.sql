-- RPC functions backing the admin panel's "Administradores" page.
-- These reach into auth.users (a managed schema) via SECURITY DEFINER,
-- which is only safe because EXECUTE is revoked from anon/authenticated
-- below — only the project_admin role (the API-key/admin SDK client) can
-- call them, never a signed-in end user or anonymous visitor.

CREATE OR REPLACE FUNCTION public.admin_list_users()
RETURNS TABLE (id uuid, email text, created_at timestamptz, is_project_admin boolean)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = pg_catalog, public, pg_temp
AS $$
  SELECT id, email, created_at, is_project_admin
  FROM auth.users
  ORDER BY created_at DESC;
$$;

-- Called right after insforge.auth.signUp() via the admin client, since
-- signup still requires email verification even when created by an admin.
CREATE OR REPLACE FUNCTION public.admin_verify_user(target_id uuid)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = pg_catalog, public, pg_temp
AS $$
  UPDATE auth.users SET email_verified = true WHERE id = target_id;
$$;

CREATE OR REPLACE FUNCTION public.admin_delete_user(target_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public, pg_temp
AS $$
BEGIN
  IF (SELECT count(*) FROM auth.users) <= 1 THEN
    RAISE EXCEPTION 'No se puede eliminar el último administrador.';
  END IF;

  DELETE FROM auth.users WHERE id = target_id;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.admin_list_users() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.admin_verify_user(uuid) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.admin_delete_user(uuid) FROM PUBLIC, anon, authenticated;
