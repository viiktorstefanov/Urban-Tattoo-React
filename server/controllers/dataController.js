const dataController = require('express').Router();
const { isAdmin } = require('../middlewares/guards');
const generateUniqueFileName = require('../services/generateUniqueFileName');
const { getAll, deleteById, addTattoo, getById, getTattooPropsById, addLikeToTattoo, removeLikeToTattoo, addCommentToTattoo, getCommentById, deleteCommentFromTattoo, editCommentFromTattoo } = require('../services/tattoosService');
const { parseError } = require('../utils/parseError');
const path = require('path');
const sharp = require('sharp');

dataController.get('/tattoos', async (req, res) => {
    //sending all tattoo images without their comments
    res.json(await getAll());
    console.log('All tattoo images were sent.');
});

dataController.post('/upload', isAdmin(), async (req, res) => {
    try {
        const file = req.files.files;
        const extension = file.name.split('.')[1];
        const imageName = generateUniqueFileName(extension);

        const imagesDir = path.resolve(__dirname, '../images');
        const uploadPath = path.join(imagesDir, imageName);

        const imageUrl = `https://urban-eell.onrender.com/${imageName}`;

        const width = 768; 
        const height = 1024;
    
        if (file.size > 5000000) {
            console.log('Cannot upload image bigger than 5MB');
            throw new Error('File should be less than 5MB');
        }
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            sharp(file.data)
                .rotate()
                .resize(width, height, {
                    fit: 'cover',
                    withoutEnlargement: true // this ensures that the image isn't enlarged
                })
                .toFile(uploadPath, async function(err) {
                    if (err) {
                        const message = parseError(err);
                        return res.status(500).json({ message });
                    } else {
                        const user = JSON.parse(req.headers.user);
                        const tattoo = await addTattoo(imageUrl, user._id);
                        console.log(`(file "${imageName}") has been uploaded and resized.`);
                        res.json(tattoo).end();
                    }
                });
        } else {
            console.log('file is not a jpeg/png');
            throw new Error('Only jpg or png files are allowed');
        }
    } catch (error) {
        const message = parseError(error);
        if (error == "Error: Only images are allowed") {
            res.status(415).json({ message });
        } else if (error == "Error: File should be less than 5MB") {
            res.status(413).json({ message });
        } else {
            res.status(400).json({ message });
        }
    }
});

dataController.delete('/tattoos/:id', isAdmin(), async (req, res) => {
    try {
        const id = req.params.id;
        const image = await getById(id);
        const user = JSON.parse(req.headers.user);
        if (user._id == image.ownerId) {
            await deleteById(id);
            console.log(`(file "${image.imageUrl.split('https://urban-eell.onrender.com/')[1]}") has been deleted`);
            res.status(204).end();
        } else {
            res.status(403);
            console.log(`Not an owner user with email: ${user.email} is trying to delete a image with id: ${image._id}`);
            throw new Error(`You're not the owner of this image`);
        }
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

dataController.get('/:id/likes', async (req, res) => {
    try { 
        const tattooId = req.params.id;
        const user = JSON.parse(req.headers.user);
        
        const userId = user._id;
        await addLikeToTattoo(tattooId, userId);

        console.log(`user ${user.email} liked image with id : ${tattooId}`);
        res.status(204).end();
    } catch (error) {
        const message = parseError(error);
        res.json({ message });
    }
});

dataController.delete('/:id/likes', async (req, res) => {
    try {
        const tattooId = req.params.id;
        const user = JSON.parse(req.headers.user);
        const userId = user._id;

        await removeLikeToTattoo(tattooId, userId);
        console.log(`user ${user.email} unlike image with id : ${tattooId}`);
        res.status(204).end();
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

dataController.get('/:id/comments', async (req, res) => {
    try {
        const tattooId = req.params.id;
        const tattooProps = await getTattooPropsById(tattooId);
        res.json(tattooProps).end();
        console.log(`sending info about tattoo with id:  ${tattooId}`);
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    };
});

dataController.post('/:id/comments', async (req, res) => {
    try {
        const tattooId = req.params.id;
        let user = JSON.parse(req.headers.user);

        const ownerId = user._id;
        const ownerfullName = `${user.firstName} ${user.lastName}`;
        const comment = req.body;

        if (comment.comment.length <= 0) {
            throw new Error('Please, type your comment');
        }

        const commentData = {
            ownerId,
            ownerfullName,
            comment: comment.comment,
        };

        const result = await addCommentToTattoo(tattooId, commentData);
        res.json(result.comments[0]).end();
        console.log(`User: ${user.email} added new comment to tattoo with id ${tattooId}`);
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

dataController.delete('/:id/comments', async (req, res) => {
    try {
        const user = JSON.parse(req.headers.user);
        const userId = user._id;
        const commentId = req.params.id;
        const tattoo = await getCommentById(commentId);
        const ownerId = tattoo.comments[0].ownerId.toString();

        if(ownerId !== userId && user._role !== 'admin') {
            res.status(403);
            throw new Error(`You're not the owner of this comment`)
        };
        
        await deleteCommentFromTattoo(commentId);
        res.status(204).end();
        console.log(`User: ${user.email} deleted his comment from tattoo with id ${tattoo._id}`)
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

dataController.put('/:id/comments', async (req, res) => {
    try {
        const user = JSON.parse(req.headers.user);
        const commentId = req.params.id;
        if(!req.body || !req.body.comment || req.body.comment.length <= 0) {
            throw new Error('Please, enter your new comment');
        };
        const editedComment = req.body;
        
        const updatedComment = await editCommentFromTattoo(commentId, editedComment);
        res.json(updatedComment.comments.find(x => x._id.toString() === commentId)).end();
        console.log(`User: ${user.email} edited comment with id: ${commentId}`);
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    };
});

module.exports = dataController;