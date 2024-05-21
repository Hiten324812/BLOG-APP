
 const error = (statuscode,message) => {
  const errors = new Error()
  errors.statuscode = statuscode
  errors.message = message
  return errors;
}

module.exports = error