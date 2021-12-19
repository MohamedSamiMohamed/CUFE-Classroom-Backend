module.exports =  (roles) =>{
    return async function (req, res, next) {
        if (!roles.includes(req.user.role)) return res.status(403).send('Access denied due to role violation.');
        next();
    }
}
