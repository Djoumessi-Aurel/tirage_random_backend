// Importation des biblioteques
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const cors = require('cors');


// Configuration des variables d'environement1
dotenv.config({
    path : "./config/.env"
})

// Importation des routes
const PersonneRoute = require('./Routes/personne')


// Connexion a la BD
const DBURL = process.env.DBURL

mongoose.set('strictQuery', true)

mongoose.connect(DBURL, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection

db.once('open', ()=>{
    console.log('Database Connection Established!')
})

db.on('error', (err)=>{
    console.log(err)
})


// Creation du serveur express
const app = express()
app.use(cors());

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const PORT = process.env.PORT || 8080

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}...`)
})


// Utilisation des routes dans le serveur
app.use('/api/personne', PersonneRoute)