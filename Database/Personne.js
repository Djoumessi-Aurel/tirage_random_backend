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
    },
    date_tirage: {
        type: Date,
    }, 
}, { 
    timestamps: { createdAt: 'dateCreation', updatedAt: 'dateModification' } 
    })

module.exports = mongoose.model('Personne', personneSchema)
