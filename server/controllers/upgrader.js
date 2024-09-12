const user = require('../models/user')
const nodemailer = require('nodemailer')
const upgrade = async (req, res) => {
    // console.log(`body :`, req.body)
    const { plan, id } = req.body
    const _id = id
    const currentDate = new Date();
    const deadline = new Date(currentDate.setDate(currentDate.getDate() + 30));


    try {
        const us = await user.findByIdAndUpdate(_id, {
            $set: {
                subscription: plan,
                plan_validity: deadline
            }
        }, { new: true })

        // console.log(us)


        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'uvyadav2230@gmail.com',
                pass: 'obgs tqog ccil fzrz'
            }
        });

        var mailOptions = {
            from: 'uvyadav2230@gmail.com',
            to: us.email,
            subject: 'InVoice bill for subscription',
            text: `Congratulations!! you have successfully bought our ${plan} plan. It'll be valid for next 30 days. Keep this mail for proof in future and enjoy you tube.`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (info) {
                res.json({ result: us })
                // console.log(info)
            } else {
                res.json({ success: false, message: "Something went wrong" })
                // console.log(error);
            }
        });

    }
    catch (error) {
        console.log(error)
        res.json({ message: "something went wrong" })
    }
}


const checkvalidity = async (req, res) => {
    try {
        const { id } = req.body
        // console.log(`id  : `, id)
        const usr = await user.findById(id)
        // console.log(usr.subscription)
        if (!usr)
            return res.json({ success: false })
        if (usr.subscription == "Free")
            return res.json({ usr })
        const deadline = usr.plan_validity
        const now = new Date()
        // console.log(`deadline : `, deadline)
        // console.log(now.getTime())
        // console.log(deadline.getTime())
        const diffTime = Math.abs(now.getTime() - deadline.getTime())
        if (diffTime < 0)
            res.json({ usr })
        else {
            try {
                const us = await user.findByIdAndUpdate(id, {
                    $set: {
                        subscription: "Free",
                    }
                }, { new: true })


                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'uvyadav2230@gmail.com',
                        pass: 'obgs tqog ccil fzrz'
                    }
                });

                var mailOptions = {
                    from: 'uvyadav2230@gmail.com',
                    to: us.email,
                    subject: 'Validity Expired for subscription',
                    text: `Your Plan validity has expired. Buy a new pack for true enjoy of you tube.`
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (info) {
                        res.json({ result: us })
                        // console.log(info)
                    } else {
                        res.json({ success: false, message: "Something went wrong" })
                        // console.log(error);
                    }
                });

            }
            catch (error) {
                console.log(error)
                res.json({ success: false })
            }
        }
    }
    catch (error) {
        console.log(error)
        res.json({ success: false })
    }
}

module.exports = { upgrade, checkvalidity }