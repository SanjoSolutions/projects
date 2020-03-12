module.exports = {
  getMissingFields(requiredFields, object) {
    return requiredFields.filter(requiredField => !object.hasOwnProperty(requiredField))
  }
}
