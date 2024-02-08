const path = require('path');
const Tattoos = require('../models/tattoo');
const fs = require('fs');

async function getAll() {
   return await Tattoos.find({}, '-comments');
}

async function getById(id) {
    return await Tattoos.findById(id);
}

async function getTattooByCommentId(commentId) {
    return await Tattoos.findOne({ 'comments._id': commentId });
}

async function getTattooPropsById(id) {
    return await Tattoos.findById(id, 'imageUrl likes comments');
}

async function getCommentById(commentId) {
    const tattoo = await Tattoos.findOne(
        { 'comments._id': commentId },
        { 'comments.$': 1 }
      ).lean();
      return tattoo;
}

async function deleteById(id) {
    let imageUrl = await Tattoos.findById(id).exec().then((photo) => { return photo.imageUrl });

    const imageName = imageUrl.split('http://localhost:5000/')[1];
    const imagePath = path.join(path.resolve(__dirname, '..'), '/images', imageName);
    
    fs.unlinkSync(imagePath);
  
    return await Tattoos.findByIdAndDelete(id);
}

async function addTattoo(imageUrl, ownerId) {
    const tattoo = await Tattoos.create({
       imageUrl,
       ownerId,
    }); 
    return tattoo; 
}

async function addLikeToTattoo(tattooId, userId) {
    return await Tattoos.findByIdAndUpdate(tattooId, { $push: { likes: userId } });
};

async function removeLikeToTattoo(tattooId, userId) {
    return await Tattoos.findByIdAndUpdate(
        tattooId,
        { $pull: { likes: userId } },
        { new: true } 
      );
};

async function addCommentToTattoo(tattooId, commentData) {
    return await Tattoos.findOneAndUpdate(
        { _id: tattooId },
        { $push: { comments: commentData } },
        { new: true, projection: { comments: { $slice: -1 } } }
      );
};

async function deleteCommentFromTattoo(commentId) {
   return await Tattoos.findOneAndUpdate(
        { 'comments._id': commentId },
        { $pull: { comments: { _id: commentId } } },
      );
};

async function editCommentFromTattoo(commentId, editedComment) {
    return await Tattoos.findOneAndUpdate(
        { 'comments._id': commentId },
        { $set: { 'comments.$.comment': editedComment.comment } },
        { new: true,  }
      );
};

module.exports = {
    getAll,
    deleteById,
    addTattoo,
    getById,
    getTattooPropsById,
    addLikeToTattoo,
    removeLikeToTattoo,
    addCommentToTattoo,
    getCommentById,
    deleteCommentFromTattoo,
    getTattooByCommentId,
    editCommentFromTattoo
}