const express = require('./node_modules/express')
const app = express()
require('dotenv').config()
const port = process.env.PORT
const routesController = require('./routes/v1/index')

const bodyParsar = require('./node_modules/body-parser')
app.use(bodyParsar.json({extended: true}))

app.use('/', routesController)

app.listen(port, () => {
    console.log('Server started at port : ', port)
})