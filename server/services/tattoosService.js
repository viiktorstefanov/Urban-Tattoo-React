const Tattoos = require('../models/tattoo');
const fs = require('fs');
const path = require('path');

async function getAll() {
    return Tattoos.find({});
}

async function getById(id) {
    return Tattoos.findById(id);
}

async function deleteById(id) {
    let imageUrl = await Tattoos.findById(id).exec().then((photo) => { return photo.imageUrl });
    
    const imageName = imageUrl.split('http://localhost:5000/')[1];
    const path = `D:/Github/urbanReact/server/images/${imageName}`;
    
    
    fs.unlinkSync(path);
  
    return Tattoos.findByIdAndDelete(id);
}

async function addTattoo(imageUrl) {
    const tattoo = await Tattoos.create({
       imageUrl
    }); 
    return tattoo; 
}


module.exports = {
    getAll,
    deleteById,
    addTattoo,
    getById
}