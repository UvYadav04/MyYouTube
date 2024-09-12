const comment = require("../Models/comment.js");
const mongoose = require('mongoose')

const postcomment = async (req, res) => {
    const commentdata = req.body
    // console.log(commentdata)
    const postcomment = new comment(commentdata)
    try {
        await postcomment.save()
        res.status(200).json("posted the comment")
    } catch (error) {
        res.status(400).json(error.message)
        return
    }
}

const getcomment = async (req, res) => {
    try {
        const commentlist = await comment.find()
        res.status(200).send(commentlist)
    } catch (error) {
        res.status(400).json(error.message)
        return
    }
}

const deletecomment = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).send("Comments unavailable..")
    }
    try {
        await comment.findByIdAndDelete(_id);
        res.status(200).json({ message: "deleted comment" })
    } catch (error) {
        res.status(400).json(error.message)
        return
    }
}
const editcomment = async (req, res) => {
    const { id: _id } = req.params;
    const { commentbody } = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).send("Comments unavailable..")
    }
    try {
        const updatecomment = await comment.findByIdAndUpdate(
            _id,
            { $set: { "commentbody": commentbody } }
        )
        res.status(200).json(updatecomment)
    } catch (error) {
        res.status(400).json(error.message)
        return
    }
}

module.exports = { editcomment, deletecomment, getcomment, postcomment }