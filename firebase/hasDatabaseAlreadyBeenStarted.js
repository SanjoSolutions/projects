export function hasDatabaseAlreadyBeenStarted(database) {
  return database._delegate._settingsFrozen
}
