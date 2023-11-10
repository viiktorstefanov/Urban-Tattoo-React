const { register, login, logout, updateUserById, getUserById } = require('../services/userService');
const { body, validationResult } = require('express-validator');
const { parseError } = require('../utils/parseError');
const { isGuest, hasUser } = require('../middlewares/guards');

const authController = require('express').Router();

authController.post('/register',
body('email').isEmail().withMessage('Invalid email'),
body('password').isLength( { min: 5 } ).withMessage('Password must be at least 5 characters long !'),
isGuest(),
async (req, res) => {
    try {
        const { errors } = validationResult(req);
        if(errors.length > 0) {
            throw errors;
        } 
        const token = await register(req.body.email, req.body.password, req.body.firstName, req.body.lastName, req.body.phone);
       res.json(token);
       console.log(`a new user has been registered with email: ${req.body.email}`);
    } catch(error) {
        const message = parseError(error);
        res.status(400).json( { message } );
    }

});

authController.post('/login', isGuest(), async (req, res) => {
    try {
        const token = await login(req.body.email, req.body.password);
       res.json(token);
       console.log(`user with email: ${req.body.email} has logged in`);
    } catch(error) {
        const message = parseError(error);
        res.status(401).json({ message });
    }
});

authController.get('/logout',hasUser(), async (req, res) => {
    const token = req.token;
    await logout(token);
    res.status(204).end();
});

authController.post('/edit/:id', isGuest(), async (req, res) => {
    try {
        const id = req.params.id;
        const newUserInfo = req.body;
        const currUser = await updateUserById(newUserInfo,id);

        if(currUser) {
            console.log(`user with email: ${req.body.email} has been edited`);
        }else {
            throw new Error('Problem with finding or editing this user');
        }
       res.status(204).end();
    } catch(error) {
        const message = parseError(error);
        res.status(401).json({ message });
    }
});

authController.get('/:id',hasUser(), async (req, res) => {
        const id = req.params.id;
        res.json(await getUserById(id));
});

module.exports = authController;
