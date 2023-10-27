const { Schema, model, Types } = require('mongoose');

const tattooSchema = new Schema({
    imageUrl: { type: String, required: true},
});

const tattoo = model('Tattoo', tattooSchema);

module.exports = tattoo;