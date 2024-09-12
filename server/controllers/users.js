const user = require('../models/user')
const getallusers = async (req, res) => {
    try {
        const allusers = await user.find()
        res.json({ success: true, users: allusers })
    } catch (error) {
        console.log(error)
        res.json({ success: false, users: null })
    }
}

const allactiveusers = (req, res) => {
    try {
        const allactives = req.activeusers
        // console.log('activeusers: ', allactives)
        res.json({ allactives })
    } catch (error) {
        console.log(error)
        res.json({ message: "something went wrong" })
    }
}

module.exports = { getallusers, allactiveusers }