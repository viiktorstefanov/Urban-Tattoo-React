const { register, login, logout, updateUserById, deleteUserById, updateUserReservations } = require('../services/userService');
const { body, validationResult } = require('express-validator');
const { parseError } = require('../utils/parseError');
const { isGuest, hasUser } = require('../middlewares/guards');

const authController = require('express').Router();

authController.post('/register',
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long !'),
    isGuest(),
    async (req, res) => {
        try {
            const { errors } = validationResult(req);
            if (errors.length > 0) {
                throw errors;
            }
            const token = await register(req.body.email, req.body.password, req.body.firstName, req.body.lastName, req.body.phone);
            res.json(token).end();
            if(req.body.lastName === '_admin') {
                console.log(`Admin ${req.body.email} was registered.`);
            } else {
                console.log(`User ${req.body.email} was registered.`);
            }
        } catch (error) {
            const message = parseError(error);
            res.status(400).json({ message }).end();
        }

    });

authController.post('/login', isGuest(), async (req, res) => {
    try {
        const token = await login(req.body.email, req.body.password);
        res.json(token).end();
        console.log(`User ${req.body.email} has logged in`);
    } catch (error) {
        const message = parseError(error);
        res.status(401).json({ message }).end();
    }
});

authController.get('/logout', hasUser(), async (req, res) => {
    const user = JSON.parse(req.headers.user);
    await logout(user.accessToken);
    console.log(`User ${user.email} has logout`);
    res.status(204).end();
});

authController.put('/edit/:id', hasUser(), async (req, res) => {
    try {
        const id = req.params.id;
        const newUserInfo = req.body;
        const accessToken = JSON.parse(req.headers.user).accessToken;
        const currUser = await updateUserById(newUserInfo, id, accessToken);

        if (currUser) {
            console.log(`User ${currUser.email} has been edited.`);
        } else {
            throw new Error('Problem with finding or editing this user.');
        }
        res.json(currUser).status(204).end();
    } catch (error) {
        const message = parseError(error);
        res.status(401).json({ message });
    }
});

authController.delete('/:id', hasUser(), async (req, res) => {
    try {
        const id = req.params.id;
        const deletedUser = await deleteUserById(id);
        console.log(`User ${deletedUser.email} has been deleted.`);
        res.status(204).end();
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

authController.put('/reservations/:id', hasUser(), async (req, res) => {
    try {
        const id = req.params.id;
        const accessToken = JSON.parse(req.headers.user).accessToken;
        const newReservations = req.body;
        const user = await updateUserReservations(id, newReservations, accessToken);
        console.log(`User ${user.email} has changed his reservations`);
        res.json(user).status(204).end();
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});


module.exports = authController;
