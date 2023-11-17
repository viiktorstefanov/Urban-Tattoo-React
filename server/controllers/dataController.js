const dataController = require('express').Router();
const { isAdmin } = require('../middlewares/guards');
const generateUniqueFileName = require('../services/generateUniqueFileName');
const { getAll, deleteById, addTattoo, getById } = require('../services/tattoosService');
const { parseError } = require('../utils/parseError');
const path = require('path');

dataController.get('/tattoos', async (req, res) => {
    res.json(await getAll()).end();
    console.log('The images were sent.');

    //FOR THROATING FROM SERVER
    // setTimeout(async () => {
    //     res.json(await getAll()).end();

    //   }, "5000");  
});

dataController.post('/upload', isAdmin(), async (req, res) => {
    try {
        const file = req.files.files;
        const extension = file.name.split('.')[1];
        const imageName = generateUniqueFileName(extension);
        
        const uploadPath = path.join(path.resolve(__dirname, '..'), '/images', imageName);
        const imageUrl = `http://localhost:5000/${imageName}`;
        
        if (file.size > 5000000) {
            console.log('Cannot upload image bigger than 5MB');
            throw new Error('File should be less than 5MB !');
        }
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            file.mv(uploadPath, function(err) {
                if(err) {
                    const message = parseError(err);
                    return res.status(500).json({message});
                }
            });
            const user = JSON.parse(req.headers.user);
            const tattoo = await addTattoo(imageUrl, user._id);
            console.log(`(file "${imageName}") has been uploaded .`);
            res.json(tattoo).end();
        } else {
            console.log('file is not a jpeg/png');
            throw new Error('Only jpg or png files are allowed !');
        }
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

dataController.delete('/tattoos/:id',isAdmin(), async (req, res) => {
    try {
        const id = req.params.id;
        const image = await getById(id);
        const user = JSON.parse(req.headers.user);
        if(user._id == image.ownerId) {
            await deleteById(id);
            console.log(`(file "${image.imageUrl.split('http://localhost:5000/')[1]}") has been deleted.`);
            res.status(204).end();
        } else{
            res.status(403);
            console.log(`User with email: ${user.email} is not the owner of the image with id: ${image._id}`);
            throw new Error(`You're not the owner of this image`);
        }
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

module.exports = dataController;