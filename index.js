const express = require('./node_modules/express')
const app = express()
const port = '8080'

const userServices = require('./services/users')
const bodyParsar = require('./node_modules/body-parser')


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
    res.status(200).json({
        message: `User : ${username} inserted with id: ${id}`
    })
})

app.post('/login', (req, res) => {
    const username = req.body.name
    const password = req.body.password
    user = userServices.getUserByUsername(username)
    
    try{
        if(user[0].name === username && user[0].password === password){
            res.status(200).json({
                message: 'Login successful'
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

app.get('/info/own/:username', (req, res) => {
    const username = req.params.username
    const user = userServices.getUserByUsername(username)
    res.status(200).json({
        message: user
    })
})

app.get('/info/other/:username', (req, res) => {
    const username = req.params.username
    const users = userServices.getUsersOtherThan(username)
    res.status(200).json({
        message: users
    })
})

app.post('/change/userinfo', (req, res) => {
    const oldUsername = req.body.oldUsername
    const newUsername = req.body.newUsername
    const email = req.body.email
    const mobile = req.body.mobile

    user = userServices.changeUserInfo(oldUsername, newUsername, email, mobile)
    res.status(200).json({
        message: `User ${oldUsername} updated to ${newUsername}`
    })
})


app.get('change/password')

app.listen(port, () => {
    console.log('Server started at port : ', port)
})