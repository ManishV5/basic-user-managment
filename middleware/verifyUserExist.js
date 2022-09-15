const userServices = require('../services/users')

const verifyUserExists = (req, res, next) => {
    const username = req.body.username
    user = userServices.getUserByUsername(username)

    try {
        if(user[0].name === username){
            next()
        }
    } catch {
        res.status(200).json({
            message: 'user does not exist'
        })
    }
}

module.exports = verifyUserExists