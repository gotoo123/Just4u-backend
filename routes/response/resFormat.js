const resFormat = (status, data, message = null) => {
  return {
    status: status,
    data: data,
    message: message
  }
}

module.exports = resFormat;

