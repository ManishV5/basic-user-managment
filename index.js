const express = require('./node_modules/express')
const app = express()
const port = '8080'

const registerController = require('./routes/v1/register')
const bodyParsar = require('./node_modules/body-parser')

app.get('/', (req, res) => {
    res.status(200).json({
        sucess: true,
        message: '/GET is working'
    })
})


app.use(bodyParsar.json({extended: true}))
app.use('/register', registerController)

app.listen(port, () => {
    console.log('Server started at port : ', port)
})