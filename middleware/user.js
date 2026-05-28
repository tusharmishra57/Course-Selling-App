const jwt = require("jsonwebtoken");
const JWT_USER_SECRET = "user123abc";

function userMiddleware(req, res, next)
{
    const token = req.body.token;

    const decodedInformation = jwt.verify(token, JWT_USER_SECRET);

}