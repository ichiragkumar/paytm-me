const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://tonystarc3030:JpA12RAcdk5dQYAS@cluster0.7oh6wyr.mongodb.net/paytm")

// creatre schema for the users table 

const userSchema = mongoose.Schmea({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }


})

// now create the model and export it
const User = mongoose.model("User", userSchema)
module.exports ={
    User
}