const { register, login, logout, updateUserById, getUserById, deleteUserById } = require('../services/userService');
const { body, validationResult } = require('express-validator');
const { parseError } = require('../utils/parseError');
const { isGuest, hasUser } = require('../middlewares/guards');

const authController = require('express').Router();

authController.post('/register',
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long !'),
    isGuest(),
    async (req, res) => {
        try {
            const { errors } = validationResult(req);
            if (errors.length > 0) {
                throw errors;
            }
            const token = await register(req.body.email, req.body.password, req.body.firstName, req.body.lastName, req.body.phone);
            res.json(token).end();
            console.log(`A user with email: ${req.body.email} was registered.`);
        } catch (error) {
            const message = parseError(error);
            res.status(400).json({ message }).end();
        }

    });

authController.post('/login', isGuest(), async (req, res) => {
    try {
        const token = await login(req.body.email, req.body.password);
        res.json(token).end();
        console.log(`User with email: ${req.body.email} has logged in`);
    } catch (error) {
        const message = parseError(error);
        res.status(401).json({ message }).end();
    }
});

authController.get('/logout', hasUser(), async (req, res) => {
    const token = req.token;
    const userLogout = await logout(token);
    console.log(`User with email: ${token.email} has logout`);
    res.status(204).end();
});

authController.get('/:id', hasUser(), async (req, res) => {
    const id = req.params.id;
    res.json(await getUserById(id));
});

authController.put('/edit/:id', isGuest(), async (req, res) => {
    try {
        const id = req.params.id;
        const newUserInfo = req.body;
        const currUser = await updateUserById(newUserInfo, id);

        if (currUser) {
            console.log(`User with email: ${req.body.email} has been edited.`);
        } else {
            throw new Error('Problem with finding or editing this user.');
        }
        res.status(204).end();
    } catch (error) {
        const message = parseError(error);
        res.status(401).json({ message });
    }
});

authController.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedUser = await deleteUserById(id);
        console.log(`User with email: ${deletedUser.email} has been deleted.`);
        res.status(204).end();
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

module.exports = authController;
