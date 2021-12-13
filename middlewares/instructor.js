module.exports = function (req, res, next) { 
    if (req.user.role!="instructor") return res.status(403).send('The request is Forbidden due to role!');  
    next();
}