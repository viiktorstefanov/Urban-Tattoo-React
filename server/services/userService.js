const User = require("../models/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secret = process.env.SECRET;
const tokenBlackList = new Set();

async function register(email, password, firstName, lastName, phone) {
    const existing = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });

    if (existing) {
        throw new Error('Email already used')
    }

    if (lastName === '_admin') {
        const admin = await User.create({
            email,
            hashedPassword: await bcrypt.hash(password, 10),
            firstName,
            lastName,
            phone,
            _role: ['admin']
        });


        return createToken(admin);
    }

    const user = await User.create({
        email,
        hashedPassword: await bcrypt.hash(password, 10),
        firstName,
        lastName,
        phone
    });

    return createToken(user);

};

async function login(email, password) {
    const user = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });

    if (!user) {
        throw new Error('Incorrect email or password');
    }

    const match = await bcrypt.compare(password, user.hashedPassword);

    if (!match) {
        throw new Error('Incorrect email or password');
    };

    const token = createToken(user);

    tokenBlackList.delete(token);

    return token;
};

async function logout(token) {
    tokenBlackList.add(token);
};

function createToken(user) {
    const payload = {
        _id: user._id,
        email: user.email
    };

    return {
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        reservations: user.reservations,
        _role: user._role[0],
        accessToken: jwt.sign(payload, secret),
        likes: user.likes,
    }
};

function parseToken(token) {
    if (tokenBlackList.has(token)) {
        throw new Error('Token is blacklisted');
    }

    return jwt.verify(token, secret);
}

async function updateUserById(userData, userId, accessToken) {
    const user = await User.findById(userId);

    const missing = Object.entries(userData).filter(([k, v]) => !v);
    if (missing.length > 0) {
        throw new Error(missing.map(([k, v]) => `${k} is required`).join('\n'))
    }

    user.firstName = userData.firstName;
    user.lastName = userData.lastName;
    user.phone = userData.phone;

    await user.save();
    return {
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        reservations: user.reservations,
        likes: user.likes,
        _role: user._role.join(''),
        accessToken
    };
};

async function getUserById(id) {
    return User.findById(id);
}

async function deleteUserById(id) {
    return User.findByIdAndDelete(id);
}

async function updateUserReservations(userId, reservation) {

    const newDate = reservation.date;
    const newHour = reservation.hour.split(' ').join('');

    const result = await User.find({
        'reservations': { $elemMatch: { $type: 'object' } }
    }, 'reservations');

    const allObjectReservations = result.flatMap(user => user.reservations);

    const hasMatchingReservation = allObjectReservations.some(
        x => {
            if (x.date === newDate) {
                if (x.hour === newHour) {
                    return true;
                }
            } else {
                return false;
            }
        }
    );

    if (!hasMatchingReservation) {
        const user = await User.findById(userId);

        const newReservations = [...user.reservations, { date: newDate, hour: newHour }];
        
        user.reservations = newReservations;
        
        await user.save();
        
        return user.reservations;
    } else{
        throw new Error('Sorry, the selected date and time are already booked.');
    }
}

async function getAllReservations() {
    
    const result = await User.find({
        'reservations': { $elemMatch: { $type: 'object' } }
    }, 'reservations');

    const allObjectReservations = result.flatMap(user => user.reservations);
    
    return allObjectReservations;
}

module.exports = {
    register,
    login,
    logout,
    parseToken,
    updateUserById,
    getUserById,
    deleteUserById,
    updateUserReservations,
    getAllReservations,
}