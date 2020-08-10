// Middleware function is basically just a function that has access to the request and response cycle 
// or the request in response objects.
// And then next is actually a callback that we have to run once we're done so that it moves to the next piece of middleware

const jwt = require('jsonwebtoken');
const config = require('config');



module.exports = function (req, res, next) {
    // Get token from header
    const token = req.header('x-auth-token');

    // Check if no token 
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
}