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
    const imageUrl = req.files[0].destination.split('../public')[1] + '/' + req.files[0].filename;
    const tattoo = await addTattoo(imageUrl);
    console.log(`image (file "${req.files[0].filename}") has been uploaded .`);
    res.json({ status: "files received"}).end();
});

dataController.delete('/tattoos/:id', isAdmin(), async (req, res) => {
    try {
        
        const id = req.params.id;
        const image = await getById(id);
        await deleteById(id);
        console.log(`image (file "${image.imageUrl.split('../../src/assets/images/tattoos/')[1]}") has been deleted.`);
        res.status(204).end();
    } catch(error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

module.exports = dataController;