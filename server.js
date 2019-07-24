const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')

if(process.env.NODE_ENV !== 'production') require('dotenv').config()

const app = express()
const PORT = 5000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors())

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')))
}

app.get('/', (req, res) => console.log('Hello world'))

app.listen(PORT, () => console.log(`app listening on port ${PORT}`))