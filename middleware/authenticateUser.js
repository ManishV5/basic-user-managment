const userServices = require('../services/users')

const authenticateUser = (req, resp, next) => {
    const base64Cred = req.headers.authorization.split(' ')[1]
    const cred = Buffer.from(base64Cred, 'base64').toString()
    const [username, password] = cred.split(':')
    user = userServices.getUserByUsername(username)
    if(username === user.name && password === user.password){
        next()
    } else {
        res.status(400).send({
            sucess: true,
            message: 'Invalid credentials'
        })
    }
}

module.exports = {
    authenticateUser
}