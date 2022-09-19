const routes = require('express').Router()

const userServices = require('../../services/users')
const authMiddleware = require('../../middleware/authenticateToken')
const loginVerificationMW = require('../../middleware/loginVerification')
const verifyUserExistsMW = require('../../middleware/verifyUserExist')
const jwt = require('../../node_modules/jsonwebtoken')

routes.post('/register', (req, res) => {
    const username = req.body.name
    const email = req.body.email
    const mobile = req.body.mobile
    const password = req.body.password

    userServices.addUser(username, mobile, password, email)
    const token = {name: username}
    const accessToken = jwt.sign(token, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1m'
    })
    res.status(200).json({
        message: `User : ${username} inserted`,
        accessToken: accessToken
    })
})

routes.post('/login', loginVerificationMW, (req, res) => {
    const username = req.body.name
    
    const token = {name: username}
    const accessToken = jwt.sign(token, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1m' })
            
    res.status(200).json({
        message: 'Login successful',
        accessToken: accessToken
    }) 
})

routes.get('/info/own/:username', authMiddleware, (req, res) => {
    const username = req.params.username
    const user = userServices.getUserByUsername(username)
    res.status(200).json({
        message: user
    })
})

routes.get('/info/other/:username', authMiddleware, (req, res) => {
    const username = req.params.username
    const users = userServices.getUsersOtherThan(username)
    res.status(200).json({
        message: users
    })
})

routes.post('/change/userinfo', authMiddleware, (req, res) => {
    const oldUsername = req.body.oldUsername
    const newUsername = req.body.newUsername
    const email = req.body.email
    const mobile = req.body.mobile

    userServices.changeUserInfo(oldUsername, newUsername, email, mobile)
    res.status(200).json({
        message: `Successfully updated ${newUsername} info`
    })
})


routes.post('/change/password', [authMiddleware, verifyUserExistsMW], (req, res) =>{
    const username = req.body.username
    const newPassword = req.body.newPassword
    userServices.changePassword(username, newPassword)
    res.status(200).json({
        message: `User ${username} changed password`
    })
})

module.exports = routes