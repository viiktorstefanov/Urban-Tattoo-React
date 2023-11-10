const dataController = require('express').Router();
// const { isAdmin } = require('../middlewares/guards');
const { getAll, deleteById, addTattoo, getById } = require('../services/tattoosService');
const { parseError } = require('../utils/parseError');

const fileTransfer = require('../services/multer');
const uploads = fileTransfer();

dataController.get('/tattoos', async (req, res) => {
    console.log('tattoos sended');
    res.json(await getAll()).end();

    //FOR THROATING FROM SERVER
    // setTimeout(async () => {
    //     res.json(await getAll());

    //   }, "10000");  
});

dataController.post('/upload', uploads.array("files"), async (req, res) => {
    //before fileTransfer -> should  not save file when is not jpg/img
    // add middleware isadmin
    const fileSize = req.files[0].size;
    try {
        if (fileSize > 5000000) {
            console.log('Cannot upload image bigger than 5MB');
            throw new Error('File should be less than 5MB !');
        }
        if (req.files[0].mimetype !== 'image/jpeg') {
            console.log('file is not a image/jpeg');
            throw new Error('Only images are allowed !');
        }
        const imageUrl = req.files[0].destination.split('../public')[1] + '/' + req.files[0].filename;
        const tattoo = await addTattoo(imageUrl);
        console.log(`(file "${req.files[0].filename}") has been uploaded .`);
        res.json(tattoo).end();
    } catch (error) {
        if(error == "Error: Only images are allowed !") {
            const message = parseError(error);
            res.status(415).json({ message });
        } else if(error == "Error: File should be less than 5MB !") {
            const message = parseError(error);
            res.status(413).json({ message });
        } else {
            const message = parseError(error);
            res.status(400).json({ message });
        }
    }
});

dataController.delete('/tattoos/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const image = await getById(id);
        await deleteById(id);
        console.log(`(file "${image.imageUrl.split('/assets/images/tattoos/')[1]}") has been deleted.`);
        res.status(204).end();
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});



module.exports = dataController;