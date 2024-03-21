const Reg = require('../models/reg')
const bcrypt = require('bcrypt')


exports.register = async (req, res) => {
    try {
        const { name, email, password, repassword } = req.body
        console.log("password:",password);
        console.log("repassword:",repassword);
        const cpass = await bcrypt.hash(password, 10)
        const usercheck = await Reg.findOne({ email: email })
        if (usercheck == null) {
            const record = new Reg({ email: email, password: cpass, name: name, repassword: repassword })
            record.save()
            res.status(201).json({
                message: `successfully email has been registered`,
                status: 201
            })
        } else {
            res.status(400).json({
                message: `${email} is already register`
            })
        }
    } catch (error) {
        res.status(400).json({
            message: error.message,
            status: 400
        })

    }
}

exports.logincheck = async (req, res) => {
    try {
        const { email, password } = req.body
        const record = await Reg.findOne({ email: email })
        if (record !== null) {
            let compare = await bcrypt.compare(password, record.password)
            if (compare) {
                res.json({
                    status: 200,    
                    email: record.email
                })
            } else {
                res.status(400).json({
                    status: 400,
                    message: "Wrong credentails"
                })
            }
        } else {
            res.status(400).json({
                status: 400,
                message: "Wrong credentails"
            })
        }
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: error.message
        })
    }
}