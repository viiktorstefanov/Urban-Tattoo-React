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
        { 'comments.$': 1 } // Projection to include only the matching comment
      ).lean();
      return tattoo;
}

async function deleteById(id) {
    let imageUrl = await Tattoos.findById(id).exec().then((photo) => { return photo.imageUrl });
    
    const imageName = imageUrl.split('http://localhost:5000/')[1];
    const path = `D:/Github/urbanReact/server/images/${imageName}`;
    
    
    fs.unlinkSync(path);
  
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
        { new: true } // This option returns the modified document
      );
};

async function addCommentToTattoo(tattooId, commentData) {
    return await Tattoos.findByIdAndUpdate(tattooId, { $push: { comments: commentData } }, { new: true });
};

async function deleteCommentFromTattoo(commentId) {
   return await Tattoos.findOneAndUpdate(
        { 'comments._id': commentId },
        { $pull: { comments: { _id: commentId } } },
        { new: true }
      );
};

async function editCommentFromTattoo(commentId, editedComment) {
    return await Tattoos.findOneAndUpdate(
        { 'comments._id': commentId },
        { $set: { 'comments.$.comment': editedComment.comment } },
        { new: true } // Return the updated document
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