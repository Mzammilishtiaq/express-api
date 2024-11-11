const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userschema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

userschema.methods.tokengenerate = async function () {
    try {
        const token = await jwt.sign({ _id: this._id.toString() }, process.env.SECRET_TOKEN_KEY);
        this.tokens = this.tokens.concat({ token: token });
       // await this.save();
        return token;
    } catch (err) {
        res.send(err);
    }
}
userschema.pre("save", async function (next) {
    console.log(">>>>>>>>>>", this.password)
    this.password = await bcryptjs.hashSync(this.password, 10)
    next();
    console.log(">>>>>>>>>>", this.password)
});
const userModel = mongoose.model("muzammils", userschema);
module.exports = userModel;