const jwt = require("jsonwebtoken");
const { JWT_ADMIN_SECRET } = require("../config");

function adminMiddleware(req, res, next)
{
    const token = req.body.token;

    try
    {
        const decoded = jwt.verify(token, JWT_ADMIN_SECRET);
        
        req.creatorId = decoded.id;   
        next();
        
    }
    
    catch(e)
    {
         res.status(403).json({
         msg:"you are not signed in yet"
        })
    }

}

module.exports = {
    adminMiddleware: adminMiddleware
}