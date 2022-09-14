const routes = require('express').Router()
const userServices = require('../../services/users')

routes.post('/', (req, res) => {
    const username = req.body.name
    const email = req.body.email
    const mobile = req.body.mobile
    const password = req.body.password

    console.log(username, email, mobile, password)
    id = userServices.addUser(username, email, mobile, password)
    res.status(200).json({
        message: `User : ${username} inserted with id: ${id}`
    })
})

module.exports = routes