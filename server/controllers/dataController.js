const dataController = require('express').Router();
// const { isAdmin } = require('../middlewares/guards');
const { getAll, deleteById, addTattoo, getById } = require('../services/tattoosService');
const { parseError } = require('../utils/parseError');
const path = require('path');

dataController.get('/tattoos', async (req, res) => {
    console.log('tattoos sended');
    res.json(await getAll()).end();

    //FOR THROATING FROM SERVER
    // setTimeout(async () => {
    //     res.json(await getAll()).end();

    //   }, "10000");  
});

dataController.post('/upload', async (req, res) => {
    // add middleware isadmin

    try {
        const file = req.files.files;
        const imageName = "IMG0003" +`${(Math.random()* 10000000).toFixed(0).toString().slice(0,9)}.jpg`;
        
        const uploadPath = path.join(path.resolve(__dirname, '..'), '/images', imageName);
        const imageUrl = `http://localhost:5000/${imageName}`;
        
        if (file.size > 5000000) {
            console.log('Cannot upload image bigger than 5MB');
            throw new Error('File should be less than 5MB !');
        }
        if (file.mimetype !== 'image/jpeg') {
            console.log('file is not a image/jpeg');
            throw new Error('Only images are allowed !');
        }

        file.mv(uploadPath, function(err) {
            if(err) {
                const message = parseError(err);
                return res.status(500).json({message});
            }
        });
       
        const tattoo = await addTattoo(imageUrl);
        console.log(`(file "${imageName}") has been uploaded .`);
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
        console.log(`(file "${image.imageUrl.split('http://localhost:5000/')[1]}") has been deleted.`);
        res.status(204).end();
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

module.exports = dataController;