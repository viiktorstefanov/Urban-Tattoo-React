const Tattoos = require('../models/tattoo');
const fs = require('fs');
const path = require('path');

async function getAll() {
    return Tattoos.find({}).sort({"_id": 1});
}

async function getById(id) {
    return Tattoos.findById(id);
}

async function deleteById(id) {
    let imageUrl = await Tattoos.findById(id).exec().then((photo) => { return photo.imageUrl });
    let pathDelete = path.resolve(__dirname, imageUrl);
    fs.unlinkSync(pathDelete);

    return Tattoos.findByIdAndDelete(id);
}

async function addTattoo(imageUrl) {
    const tattoo = await Tattoos.create({
       imageUrl
    });  
}


module.exports = {
    getAll,
    deleteById,
    addTattoo,
    getById
}