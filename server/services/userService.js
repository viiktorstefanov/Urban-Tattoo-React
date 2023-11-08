const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secret = 'm0sTD@ng3rouSPa$$worD1995';
const tokenBlackList = new Set();

async function register(email, password, fullName, phone) {
    const existing = await User.findOne( { email }).collation( { locale: 'en', strength: 2 });
    
    if(existing) {
        throw new Error('Email already used !')
    }
    
    
    const user = await User.create({
        email,
        hashedPassword: await bcrypt.hash(password, 10),
        fullName,
        phone
    }); 
    

    return createToken(user);
};

async function login(email, password) {
   const user = await User.findOne( { email }).collation( { locale: 'en', strength: 2 });

   if(!user) {
    throw new Error('Incorrect email or password');
   }
   
   const match = await bcrypt.compare(password, user.hashedPassword);

   if(!match) {
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
        fullName: user.fullName,
        phone: user.phone,
        _role: user.roles[0],
        accessToken: jwt.sign(payload, secret)
    } 
};

function parseToken(token) {
    if(tokenBlackList.has(token)) {
        throw new Error('Token is blacklisted !');
    } 

    return jwt.verify(token, secret);
}

async function updateUserById(userData, userId){
    const user = await User.findById(userId);

    const missing = Object.entries(userData).filter(([k, v]) => !v);
    if (missing.length > 0) {
        throw new Error(missing.map(([k, v]) => `${k} is required!`).join('\n'))
    }

    user.fullName = userData.name;
    user.email = userData.email;
    user.phone = userData.phone;

    await user.save();
    return user;
};

async function getUserById(id) {
    return User.findById(id);
}

module.exports = {
    register, 
    login,
    logout,
    parseToken,
    updateUserById,
    getUserById
}