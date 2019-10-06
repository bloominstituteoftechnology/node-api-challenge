function logger (req, res, next) {
    console.log(`A ${req.method} occured on ${req.path}!`)
    next();
}

module.exports = logger;