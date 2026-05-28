const jwt = require("jsonwebtoken");
const { JWT_USER_SECRET } = require("../config");

function adminMiddleware(req, res, next)
{
    const token = req.body.token;

    const decoded = jwt.verify(token, JWT_ADMIN_SECRET);
    if(decoded)
    {
        req.creatorID = decoded.id;   
        next()
    }
    else
    {
        res.status(403).json({
            msg:"you are not signed in yet"
        })
    }

}

module.exports = {
    adminMiddleware: adminMiddleware
}