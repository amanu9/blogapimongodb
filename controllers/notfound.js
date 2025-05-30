// controllers/notfound.js
const notFound = (req, res, next) => {
    res.status(404).json({
        code: 404, // Should be 404 for "Not Found"
        status: false,
        message: "URL Not Found"
    });
};

module.exports = notFound;