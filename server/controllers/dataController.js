const dataController = require('express').Router();
const { isAdmin } = require('../middlewares/guards');
const { getAll, deleteById, addTattoo, getById } = require('../services/tattoosService');
const { parseError } = require('../utils/parseError');


dataController.get('/tattoos', async (req, res) => {
    res.json(await getAll());
});

const fileTransfer = require('../services/multer');
const uploads = fileTransfer();

dataController.post('/upload',uploads.array("files"),async (req, res) => {
    const fileSize = req.files[0].size
    if (fileSize > 5000000) {
            res.status(401).json({ message: 'File should be less than 5MB !'});
            console.log('Cannot upload image bigger than 5MB');
            return;
    }
    const imageUrl = req.files[0].destination.split('../public')[1] + '/' + req.files[0].filename;
    const tattoo = await addTattoo(imageUrl);
    console.log(`(file "${req.files[0].filename}") has been uploaded .`);
    res.json({ status: "files received"}).end();
});

dataController.delete('/tattoos/:id',async (req, res) => {
    try {
        const id = req.params.id;
        const image = await getById(id);
        await deleteById(id);
        console.log(`(file "${image.imageUrl.split('/assets/images/tattoos/')[1]}") has been deleted.`);
        res.status(204).end();
    } catch(error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

module.exports = dataController;