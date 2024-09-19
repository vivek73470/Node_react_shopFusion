const express = require('express')
const User = require('../model/RegisterLoginModel/usermodel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userRouter = express.Router();


// REGISTER
userRouter.post('/register', async (req, res) => {
    const { username, email, password } = req.body
    try {
        bcrypt.hash(password, 5, async (err, secure_password) => {
            if (err) {
                console.log(err)
                return res.send(500).json({ message: "Error hashing password" })
            } else {
                const usersave = new User({ username, email, password: secure_password })
                await usersave.save()
                return res.status(200).json({status:true, message: 'Registered successfully' });
            }
        });
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Error while registering user' });
    }
})

// LOGIN
userRouter.post('/login',async(req,res)=>{
    const{email,password} = req.body;
    try{
        const emailFound = await User.find({email})
        if(!emailFound){
            return res.send(500).status({message:'email not found'})
        }
        if(emailFound.length>0){
            bcrypt.compare(password, emailFound[0].password, (err, result)=>{
                if (err) {
                    console.log(err);
                    return res.status(500).json({ message: "Internal server error" });
                }
                if (result) {
                    const token = jwt.sign({ course: 'backend' }, 'masai')
                    return res.status(200).json({status:true, message: "Login successfully", token: token });
                } else {
                    return res.status(401).json({ message: "Wrong credentials" });
                }
            })
        }else {
            return res.send("wrong credentials")
        }

    }catch(e){
        console.log(err)
        return res.send(500).status({message:'internal server error'})
    }
})

module.exports = userRouter;