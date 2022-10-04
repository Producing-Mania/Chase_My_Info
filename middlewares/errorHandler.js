const errorHandler = (err, req, res, next) => {
    console.error(err);
    res.status(err.status).send({ status: err.status, message: err.message });
};

module.exports = errorHandler;
