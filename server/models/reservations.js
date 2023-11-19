const { Schema, model } = require('mongoose');

const reservationSchema = new Schema({
    date: { type: String, required: [true, 'Please, select a date'] },
    '10:00': { type: Boolean, default: false },
    '13:00': {type: Boolean, default: false },
});

const reservation = model('Reservation', reservationSchema);

module.exports = reservation;
