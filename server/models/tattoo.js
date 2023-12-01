const { Schema, model, Types } = require('mongoose');

const tattooSchema = new Schema({
    imageUrl: { type: String, required: true},
    ownerId: {type: Types.ObjectId, ref: 'User', required: true},
    comments: [
        {
            ownerId: { type: Types.ObjectId,
            ref: 'User', required: true },
            ownerfullName: { type: String, required: true },
            comment: { type: String, required: [true, 'comment text missing'], minlength: [4, 'min length is 5 charracters long'], maxlength: [100, 'max length is 100 charracters long']},
        }
    ],
    likes: [
        {
            type: Types.ObjectId,
            ref: 'User',
        }
    ]
});

const tattoo = model('Tattoo', tattooSchema);

module.exports = tattoo;