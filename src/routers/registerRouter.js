const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const registerModel = require("../database/model/register");

router.post('/register', async (req, res) => {
    const creat = registerModel(req.body);
    const token = await creat.tokengenerate();
    // res.cookie('jwtmuz', token, {
    //     expires: new Date(Date.now() + 3000),
    //     httpOnly: true,
    //     // secure:true
    // });
    console.log(token);
    const create = await creat.save();
    res.status(201).send(create);
});

router.post('/login', async (req, res) => {
    try {
        const {email,password} = req.body.email;
        // const Password = req.body.password;
        // console.log(email, Password)

        const user = await registerModel.findOne({ email: email });
        console.log(user)
        if (!user) {
            return res.status(404).send("User not found");
        }

        const match = await bcryptjs.compareSync(password, user.password);
        res.send({ success: true, match: match });
        // console.log(">>>>>>>>>>>>",match)
        //  if(match) {
        //         res.send({success: true, _token: token});
        //     } else {
        //         return res.status(401).send({success: false});
        //     }
        // if (match && user.password) {
        //     const token = await user.tokengenerate();
            // if (match) {
            //     res.send({ success: true, _token: token });
            // } else {
            //     return res.status(401).send({ success: false });
            // }
        // } else {
        //     res.status(401).send({ Matchpassword: match })
        //     console.log({ Matchpassword: match })
        // }

    } catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;