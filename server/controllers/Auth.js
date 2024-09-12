const user = require('../models/user')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const otpgenerator = require('otp-generator')
const twilio = require('twilio');
const fast2sms = require('fast2sms')
var unirest = require("unirest");
const axios = require('axios');


const login = async (req, res) => {
    try {
        // console.log("in login")
        // console.log("body : ", req.body)
        const { email, state, username } = req.body


        // console.log(`body : `, req.body)
        // console.log("io : ", req.io)
        // console.log(io)
        const t = await user.findOne({ email: email })
        if (!t) {
            try {
                // console.log("In first")
                const newuser = new user({ email: email, state: state, username: username })
                await newuser.save()
                const token = jwt.sign({ email: newuser.email, id: newuser._id }, process.env.JWT_SECRET, { expiresIn: "1h" })
                // console.log(newuser)
                res.json({ result: newuser, token })
            }
            catch (error) {
                console.log(error)
                res.status(500).json({ message: "something went wrong" })
            }
        }
        else {
            // console.log("in second")
            const token = jwt.sign({ email: t.email, id: t._id }, process.env.JWT_SECRET, { expiresIn: "1h" })
            // console.log(t)
            res.json({ result: t, token })
        }
    }
    catch (error) {
        console.log(error)
        res.json({ message: "something went wrong" })
    }
}

const updatepoints = async (req, res) => {
    try {
        // console.log(req.body)
        const { viewer, videoid } = req.body
        const usr = await user.findByIdAndUpdate(viewer, {
            $inc: { points: 5 }
        }, { new: true })

        res.json({ usr })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: "something went wrong" })
    }
}

const sendotp = async (req, res) => {
    try {
        const { email, mobile } = req.body
        // console.log(email)
        const newotp = otpgenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false })

        if (email) {
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'uvyadav2230@gmail.com',
                    pass: 'obgs tqog ccil fzrz'
                }
            });

            var mailOptions = {
                from: 'uvyadav2230@gmail.com',
                to: email,
                subject: 'New message from client',
                text: `${newotp} is you one time password to login in Youtube`
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (info) {
                    // console.log("otpsend")
                    res.json({ success: true, otp: newotp })
                } else {
                    console.log(error)
                    res.json({ success: false, message: "Something went wrong" })
                }
            });
        }
        else if (mobile) {
            console.log(mobile)


            const response = await fetch("https://www.fast2sms.com/dev/bulkV2?authorization=B4SXJ5lDq0ztHjM3IgsCpwZb1dhcrA8ENQyUFxiuneO9YVmvTKALbaPnwTzfGY4rh3NOqKV5oI268pWk&route=otp&variables_values=&flash=0&numbers='9813163920", {
                method: "GET"
            })

            const json = await response.json();
            console.log(json)



        }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Otp sending failed" })
    }
}

module.exports = { login, updatepoints, sendotp }