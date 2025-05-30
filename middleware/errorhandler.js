


const errorHandler = (error, req, res, next) => {
    // 1. Get status code from error or default to 500
    const statusCode = error.statusCode || res.statusCode || 500;
    
    // 2. Prepare response object
    const response = {
        success: false,
        code: statusCode,
        message: error.message,
        // Only include stack trace in development this is good because in production it is bad habit to use it
        ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    };

    // 3. Send JSON response
    res.status(statusCode).json(response);
};

module.exports = errorHandler;

