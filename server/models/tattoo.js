const { Schema, model, Types } = require('mongoose');

const tattooSchema = new Schema({
    imageUrl: { type: String, required: true},
    ownerId: {type: Types.ObjectId, ref: 'User', required: true},
});

const tattoo = model('Tattoo', tattooSchema);

module.exports = tattoo;