const routes = require('express').Router()
const userServices = require('../../services/users')

routes.post('/', (req, res) => {
    const username = req.body.name
    const password = req.body.password
    user = userServices.getUserByUsername(username)
    if(user[0].name === username && user[0].password === password){
        res.status(200).json({
            message: 'Login successful'
        })
    } else {
        res.status(200).json({
            message: 'Invalid login attempt'
        })
    }
})

module.exports = routes