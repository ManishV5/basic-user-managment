const userServices = require('../services/users')
const bcrypt = require('bcrypt')

const loginVerification = async (req, res, next) => {
    const username = req.body.name
    const password = req.body.password
    
    user = userServices.getUserByUsername(username)
    try{
        if(user[0].name === username && (await bcrypt.compare(password, user[0].password))){
           next()
        } else {
            res.status(200).json({
                message: 'Invalid username or password'
            })
        }
    } catch (error){
        res.status(200).json({
            message: 'Invalid login attempt'
        })
    }    
}

module.exports = loginVerification