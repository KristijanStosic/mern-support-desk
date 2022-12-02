const { logEvents } = require('./logger')

const errorHandler = (err, req, res, next) => {
  logEvents(
    `${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
    'errLog.log'
  )

  console.log(err.stack)

  //console.log(err.message);
  const defaultError = {
    statusCode: err.statusCode || 500,
    message: err.message || 'Something went wrong, try again later',
  }

  if (err.name === 'CastError') {
    defaultError.statusCode = 400
    defaultError.message = `Invalid mongoose id format. Invalid path: ${err.path}`
  }

  //res.status(defaultError.statusCode).json({ message: err })
  res.status(defaultError.statusCode).json({ message: defaultError.message })
}

module.exports = errorHandler
