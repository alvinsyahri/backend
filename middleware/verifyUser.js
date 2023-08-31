const jwt = require('jsonwebtoken');

module.exports = {
    
    verifyUser : (req, res, next) => {
        try {
            const token = req.session.token;
            if(!token){
                res.json({Message: "we need token please provide it for next time", Token: token})
            } else{
                const username = jwt.verify(token, "12321kamsda-123nasda-12")
                req.username = username;
                next()
            }
        } catch (error) {
            res.clearCookie("token")
        }
    }
}