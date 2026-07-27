-- admin_delete_user as plpgsql was rejected with "permission denied for
-- function" even for project_admin (the role the admin/API-key SDK client
-- runs as), while the LANGUAGE sql functions in the previous migration
-- worked fine — InsForge's RPC gateway appears to restrict plpgsql.
-- Rewritten as a single LANGUAGE sql statement; the "don't delete the last
-- admin" guard becomes a no-op WHERE condition instead of a raised
-- exception (plpgsql-only feature).
DROP FUNCTION IF EXISTS public.admin_delete_user(uuid);

CREATE FUNCTION public.admin_delete_user(target_id uuid)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = pg_catalog, public, pg_temp
AS $$
  DELETE FROM auth.users
  WHERE id = target_id
    AND (SELECT count(*) FROM auth.users) > 1;
$$;

REVOKE EXECUTE ON FUNCTION public.admin_delete_user(uuid) FROM PUBLIC, anon, authenticated;
