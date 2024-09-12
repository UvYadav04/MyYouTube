const group = require('../models/Groups')
const user = require('../models/user')
const newgroup = async (req, res) => {
    try {
        const data = req.body
        // console.log(data)
        const newgroup = new group({
            name: data.newgroupname,
            members: data.members,
            admin: data.id
        })
        await newgroup.save()

        const member = req.body.members
        member.map(async (item) => {
            await user.findOneAndUpdate({ email: item }, ({
                $push: { groupsIn: newgroup._id }
            }), { new: true })
        })

        res.json({ success: true, group: newgroup })
    } catch (error) {
        console.log(error)
        res.json({ success: false, group: null })
    }
}

const getallgroups = async (req, res) => {
    try {
        // console.log("ingroups")
        const groupdata = await group.find()
        res.json({ success: true, groupdata })
    } catch (error) {
        console.log(error)
        res.json({ success: false })
    }
}
module.exports = { newgroup, getallgroups }