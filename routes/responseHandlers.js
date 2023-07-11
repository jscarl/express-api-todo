function responseHandler(req, res, next) {
  // Override the send method to format the response
  res.sendResponse = (data, statusCode = 200) => {
    res.status(statusCode).json({
      success: true,
      data: data
    });
  };

  // Override the error method to format error responses
  res.sendError = (message, statusCode = 500) => {
    res.status(statusCode).json({
      success: false,
      error: message
    });
  };

  next();
}

module.exports = responseHandler;