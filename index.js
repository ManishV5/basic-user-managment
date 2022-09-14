const express = require('./node_modules/express')
const app = express()
const port = '8080'

app.get('/', (req, res) => {
    res.status(200).json({
        sucess: true,
        message: '/GET is working'
    })
})

app.listen(port, () => {
    console.log('Server started at port : ', port)
})