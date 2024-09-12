const user = require("../models/user");
const mongoose = require('mongoose')
const updatechannel = async (req, res) => {
    try {
        const { id: _id } = req.params
        const { name, description } = req.body
        // console.log(_id, name, description)
        if (mongoose.Types.ObjectId.isValid(_id)) {
            try {
                const c = await user.findByIdAndUpdate(_id, {
                    $set: {
                        name: name,
                        description: description
                    },

                }, { new: true })

                res.json({ c })
            }
            catch (error) {
                console.log(error)
                res.json({ message: "something went wrong" })
            }
        }
    }
    catch (error) {
        console.log(error)
        res.json({ message: "something went wrong" })
    }
}

const fetchallchannels = async (req, res) => {
    try {
        const channels = await user.find({})
        const allchaneldata = []
        channels.forEach((channel) => {
            allchaneldata.push({
                _id: channel._id,
                name: channel.name,
                email: channel.email,
                desc: channel.description
            });
        });
        res.json(allchaneldata)
    }
    catch (error) {
        console.log(error)
        res.json({ message: "something went wrong" })
    }
}


module.exports = { updatechannel, fetchallchannels }