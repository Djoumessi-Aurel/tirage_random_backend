const Personne = require('../Database/Personne')

// Create an new personne (Create)
const store = async (req, res, next) => {
    try {
        let personne = new Personne({
            nom: req.body.nom,
            a_tire: req.body.a_tire,
            date_tirage: req.body.date_tirage || new Date()
        })

        let result = await personne.save()
        res.status(200).json({
            message: 'Personne enregistrée avec sucèss!', content: result
        })
    } catch (error) {
        res.status(400).json({
            message:'Une erreur est survenue!', content: error.message
        })
    }

}

// Show the list of personne (Read)
const showAll =(req, res, next) => {
    Personne.find()
    .then(response =>{
        res.status(200).json(response)
    })
    .catch(error => {
        res.status(400).json({
            message:'Une erreur est survenue!', content: error.message
        })
    })
}

// Show single personne by Id (Read)
const showById = (req, res, next) =>{
    let id = req.params.id
    Personne.findById(id)
    .then(response => {
        res.status(200).json(response)
    })
    .catch(error => {
        res.status(400).json({
            message:'Une erreur est survenue!', content: error.message
        })
    })
}



const tirerPersonne = async (req, res, next) => {
    try {
        let nomX = req.body.nom?.trim()
        let personnes = await Personne.find()
        let persX = personnes.find((val) => {return val.nom.toLowerCase() == nomX?.toLowerCase()})
        if(!persX) {res.status(400).json({message:"Erreur. Vous n'êtes pas concerné par ce tirage."}); return;}
        if(persX.a_tire) {res.status(200).json({message:`Hello ${persX.nom}. Votre correspondant est ${persX.a_tire}`}); return;}

        // Tirage du correspondant
        let personnes_a_retirer = [nomX]
        for (let pers of personnes){
            if(pers.a_tire) personnes_a_retirer.push(pers.a_tire)
        }
        personnes = personnes.filter((val) =>{return !personnes_a_retirer.includes(val.nom)}) // Liste des choix possibles
        let indice = Math.floor(Math.random()*personnes.length)

        persX.a_tire = personnes[indice].nom // Tirage d'une personne
        persX.date_tirage = new Date()
        await persX.save()
        res.status(200).json({message:`Hello ${persX.nom}. Votre correspondant est ${persX.a_tire}`})
    } catch (error) {
        res.status(400).json({
            message:'Une erreur est survenue!', content: error.message
        })
    }

}

// Delete an personne (Delete)
const destroy = (req, res, next) =>{
    let personneID = req.params.id
    Personne.findByIdAndRemove(personneID)
    .then(() => {
        res.status(200).json({
            message: 'Personne supprimée avec sucèss!'
        })
    })
    .catch(error => {
        res.status(400).json({
            message:'Une erreur est survenue!', content: error.message
        })
    })
}


module.exports = {
    store, showAll, showById, tirerPersonne, destroy
}