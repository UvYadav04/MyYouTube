const messages = require('../models/messages')

const updatemessages = async (req, res) => {
    try {
        // console.log(req.body)
        const { sender, message, roomname } = req.body
        // console.log(sender)
        const newmessage = {
            sender: sender,
            message: message,
            time: Date.now()
        }
        const existing = await messages.findOne({ Group: roomname })
        // console.log(existing)
        if (existing) {
            // console.log("hitt1")

            const messagelist = await messages.findOneAndUpdate({ Group: roomname }, {
                $push: {
                    Messages: newmessage
                }
            }, { new: true })
            // console.log(messagelist)
            res.json({ success: true, messagelist })
        }
        else if (!existing) {
            // console.log("hitt2") 
            const messagelist = new messages({
                Group: roomname,
                Messages: [newmessage]
            })
            // console.log(messagenew)
            await messagelist.save()
            res.json({ success: true, messagelist })
        }

    } catch (error) {
        console.log(error)
        res.json({ success: false })
    }
}

const getallmessages = async (req, res) => {
    try {
        const messageslist = await messages.find()
        // console.log(messageslist)
        res.json({ success: true, messageslist })
    } catch (error) {
        console.log(error)
        res.json({ success: false })
    }
}
module.exports = { updatemessages, getallmessages }