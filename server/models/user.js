const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    email: { type: String, required: true, minlength: [9, 'Email should be at least 9 characters long'], unique: true  }, 
    hashedPassword: { type: String, required: true },
    firstName: { type: String, required: [true, 'First name is required'] },
    lastName: { type: String, required: [true, 'Last name is required'] },
    phone: { type:  String, required: [true, 'Phone number is required'], minlength: [10, 'Phone number should be at least 10 characters'] },
    _role: { type: [{ type: String, enum: ['user', 'admin'] }], default: ['user'] },
    reservations: { type: [{ type: String}] },
});

userSchema.index({ email: 1 }, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('user', userSchema);

module.exports = User;