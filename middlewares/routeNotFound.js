const routeNotFound = (req, res, next) => {
    res.status(400).json({ message: 'Not found' });
}

module.exports = routeNotFound;