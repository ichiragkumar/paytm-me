const express = require('express');
const zod = require("zod")
const JWT_SECRET = require("../config")
const jwt = require("jsonwebtoken")


const { User } = require("../db");
const router = express.Router();


// now addnig zod middlewares as filtering the request
const signUpSchema =zod.object({
    username: zod.string().email(),
	firstName: zod.string(),
	lastName: zod.string(),
	password: zod.string()
})

const signInSchema = zod.object({
    username: zod.string().email(),
    password: zod.string()
})


router.post("/signup",async (req, res)=>{
    const body = req.body;
    const parsedResult = signUpSchema.safeParse(body)
    if(!parsedResult){
        return res.status(411).json({
            message: " Incorrect inputs"
        })
    }

    const user =  User.findOne({
        username: body.username
    })


    if(user._id){
        return res.status(411).json({
            message: "Email already taken"
        })
    }


    // now if checked , weather user inout is coorect and validation is fine
    // now create the user 
    const dbUser = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })


    const userId = user._id
    const token = jwt.sign({
        userId
    }, JWT_SECRET);


    res.status(201).json({
        message: "User Created Succesfully",
        token: token
    })


})


router.post("/signin",async (req, res)=>{
        const body = req.body
        const parsedSignIn = signInSchema.safeParse(body)
        if(!parsedSignIn){
            return res.status(411).json({
                message: " Incorrect inputs"
            })
        }



        // now find in database
     const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
     })

     if(user){
        const token = jwt.sign({
            userId: user._id
        },JWT_SECRET)

        res.status(200).json({
            message: "Login  Succesfully",
            token: token
        })
        return;
     }

     res.status(411).json({
        message: "Error while logging in"
    })


})


module.exports = router;