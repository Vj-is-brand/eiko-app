const ErrorHandler = require("../utils/errorhander");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  //wrong mongoDBid
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid ${err.path}`;
    err = new ErrorHandler(message, 404);
  }

  //mongoose error
  if (err.code === "11000") {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(message, 400);
  }

  //invalid jwt token
  if (err.name === "JsonWebTokenError") {
    const message = `Json web Token is invalid`;
    err = new ErrorHandler(message, 400);
  }

  //jwt expire error
  if (err.name === "TokenExpiredError") {
    const message = `Json web Token is expired,try again`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    //message:err.stack (to get the full stack error)
    message: err.message,
  });
}; // Export the error handling middleware function
