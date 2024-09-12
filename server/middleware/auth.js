const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    // console.log(req.file)
    try {
        const token = req.headers.authorisation.split(" ")[1];
        let decodedata = jwt.verify(token, process.env.JWT_SECRET)
        req.userid = decodedata?.id
        // console.log(`decoder : `, decodedata)
        req.email = decodedata.email
        next()
    } catch (error) {
        console.log(error)
        res.status(400).json("invalid credentials..")
        return
    }
}
module.exports = auth