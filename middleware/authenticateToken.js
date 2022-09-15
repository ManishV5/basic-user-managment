const jwt = require("jsonwebtoken")

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token_value = authHeader && authHeader.split(' ')[1]
    if(token_value == null) return res.status(400).json({
        message: 'no token found'
    })

    jwt.verify(token_value, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403)
        req.user = user
        next()  
    })
}

module.exports = authenticateToken