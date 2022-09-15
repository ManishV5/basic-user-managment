const express = require('./node_modules/express')
const app = express()
require('dotenv').config()
const port = process.env.PORT

const userServices = require('./services/users')
const bodyParsar = require('./node_modules/body-parser')
const bcrypt = require('bcrypt')

const jwt = require('./node_modules/jsonwebtoken')
const authMiddleware = require('./middleware/authenticateToken')

app.get('/', (req, res) => {
    res.status(200).json({
        sucess: true,
        message: '/GET is working'
    })
})


app.use(bodyParsar.json({extended: true}))

app.post('/register', (req, res) => {
    const username = req.body.name
    const email = req.body.email
    const mobile = req.body.mobile
    const password = req.body.password

    id = userServices.addUser(username, mobile, password, email)
    const token = {name: username}
    const accessToken = jwt.sign(token, process.env.ACCESS_TOKEN_SECRET)
    res.status(200).json({
        message: `User : ${username} inserted with id: ${id}`,
        accessToken: accessToken
    })
})

app.post('/login', async (req, res) => {
    const username = req.body.name
    const password = req.body.password
    user = userServices.getUserByUsername(username)
    
    try{
        if(user[0].name === username && (await bcrypt.compare(password, user[0].password))){
            const token = {name: username}
            const accessToken = jwt.sign(token, process.env.ACCESS_TOKEN_SECRET)
            res.status(200).json({
                message: 'Login successful',
                accessToken: accessToken
            })
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
})

app.get('/info/own/:username', authMiddleware.authenticateToken, (req, res) => {
    const username = req.params.username
    const user = userServices.getUserByUsername(username)
    res.status(200).json({
        message: user
    })
})

app.get('/info/other/:username', authMiddleware.authenticateToken, (req, res) => {
    const username = req.params.username
    const users = userServices.getUsersOtherThan(username)
    res.status(200).json({
        message: users
    })
})

app.post('/change/userinfo', authMiddleware.authenticateToken, (req, res) => {
    const oldUsername = req.body.oldUsername
    const newUsername = req.body.newUsername
    const email = req.body.email
    const mobile = req.body.mobile

    userServices.changeUserInfo(oldUsername, newUsername, email, mobile)
    res.status(200).json({
        message: `User ${oldUsername} updated to ${newUsername}`
    })
})


app.post('/change/password', authMiddleware.authenticateToken, (req, res) =>{
    const username = req.body.username
    const newPassword = req.body.newPassword
    userServices.changePassword(username, newPassword)
    res.status(200).json({
        message: `User ${username} changed password`
    })
})

app.listen(port, () => {
    console.log('Server started at port : ', port)
})