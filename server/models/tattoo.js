const { Schema, model } = require('mongoose');

const tattooSchema = new Schema({
    imageUrl: { type: String, required: true},
});
//should have ownerId
const tattoo = model('Tattoo', tattooSchema);

module.exports = tattoo;