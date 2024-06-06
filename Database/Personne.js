const mongoose = require('mongoose')

const personneSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true,
        minLength: 3,
        uppercase: true,
        trim: true,
        unique: true,
    },
    a_tire: {
        type: String,
        trim: true,
        required: false,
    },
    date_tirage: {
        type: Date,
        required: false,
    }, 
})

module.exports = mongoose.model('Personne', personneSchema)
