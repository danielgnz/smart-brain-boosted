const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const knex = require('knex')
const bcrypt = require('bcrypt')

const signup = require('./controllers/signup')
const login = require('./controllers/login')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

if(process.env.NODE_ENV !== 'production') require('dotenv').config()

const db = knex({
    client: 'pg',
    connection: `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@localhost:5432/smart-brain`
})

const app = express()
const PORT = 5000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')))
}

app.post('/signup', signup.handleSignUp(db, bcrypt))
app.post('/login', login.handleLogin(db, bcrypt))
app.get('/profile/:id', profile.handleProfile(db))
app.post('/clarifai', image.handleApiCall())
app.listen(PORT, () => console.log(`app listening on port ${PORT}`))