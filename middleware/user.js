const jwt = require("jsonwebtoken");
const { JWT_USER_SECRET } = require("../config");
function userMiddleware(req, res, next)
{
    const token = req.body.token;

    const decoded = jwt.verify(token, JWT_USER_SECRET);
    if(decoded)
    {
        req.userID = decoded.id;  //decoded.id because when i encode id in user.js(routes), i named it id.
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
    userMiddleware: userMiddleware
}