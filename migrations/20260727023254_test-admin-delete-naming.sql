-- Temporary diagnostic function: byte-identical body to admin_delete_user,
-- different name, to test whether the name itself (containing "delete")
-- affects RPC-layer permission checks. Will be dropped once diagnosed.
CREATE FUNCTION public.admin_test_remove_user(target_id uuid)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = pg_catalog, public, pg_temp
AS $$
  DELETE FROM auth.users
  WHERE id = target_id
    AND (SELECT count(*) FROM auth.users) > 1;
$$;

REVOKE EXECUTE ON FUNCTION public.admin_test_remove_user(uuid) FROM PUBLIC, anon, authenticated;
