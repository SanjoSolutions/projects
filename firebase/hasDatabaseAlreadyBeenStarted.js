export function hasDatabaseAlreadyBeenStarted(database) {
  return (
    database._settingsFrozen ||
    database._delegate?._settingsFrozen  // compat
  )
}
