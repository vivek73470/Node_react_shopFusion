const express = require('express')
const User = require('../model/RegisterLoginModel/usermodel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userRouter = express.Router();


// REGISTER
userRouter.post('/register', async (req, res) => {
    const { username, email, password, gender, number, address, DOB } = req.body
    try {
        // Input validation 
        // if (!username || !email || !password) {
        //     return res.status(400).json({ status: false, message: 'All fields are required' });
        // }
        const exitingUser = await User.findOne({ email });
        if (exitingUser) {
            return res.status(409).json({ status: false, message: 'Email is already registered' });
        }
        const saltRounds = 10;
        const securePassword = await bcrypt.hash(password, saltRounds)
        const newUser = new User({ username, email, gender, number, address, DOB, password: securePassword })
        await newUser.save();
        return res.status(201).json({ status: true, message: 'User registered successfully' });
    }
    catch (err) {
        console.error('Error while registering user:', err);
        if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
            return res.status(409).json({ status: false, message: 'Email is already registered' });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
})

// LOGIN
userRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: 'Email not found' })
        }
        const result = await bcrypt.compare(password, user.password);

        if (result) {
            const token = jwt.sign({ userId: user._id }, 'masai');
            return res.status(200).json({ status: true, message: "Login successfully", user: { _id: user._id }, token: token });
        } else {
            return res.status(401).json({ message: "Wrong credentials" });
        }

    } catch (e) {
        console.error('Error during login:', error);
        return res.send(500).status({ message: 'internal server error' })
    }
})

// single user details
userRouter.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const data = await User.findById(id)
        if (data) {
            return res.status(200).send({
                status: true,
                data: data,
                message: "got single user info"
            })
        }
        else {
            return res.status(404).send({
                status: false,
                message: "single user not found"
            })

        }
    } catch (e) {
        return res.status(500).send({
            status: false,
            message: "Internal error while found single user"
        })
    }
})


//edit  single user details
userRouter.put('/:id', async (req, res) => {
    const payload = req.body;
    const id = req.params.id;
    try {
        const data = await User.findByIdAndUpdate({ _id: id }, payload, { new: true })
        if (data) {
            return res.status(200).json({
                status: true,
                data: data,
                message: "edited single user info"
            })
        }
        else {
            return res.status(404).send({
                status: false,
                message: "single user not found"
            })

        }
    } catch (e) {
        console.error('Error updating user:', e);
        return res.status(500).json({
            status: false,
            message: "Internal error while found single user"
        })
    }
})

// forgot-password
userRouter.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        console.log(user)
        if (!user) {
            return res.status(404).json({
                status: false,
                message: "User with this email does not exist."
            });
        } else {
            return res.status(200).json({
                status: true,
                message: "User found. Redirect to reset password page.",
                data: user
            });
        }
    } catch (error) {
        console.error('Error in forgot password process:', error);
        res.status(500).json({
            status: false,
            message: 'Internal server error. Please try again later.'
        });
    }
}
)

// reset new password
userRouter.put('/reset-password/:id', async (req, res) => {
    const { password } = req.body;
    const id = req.params.id;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.findByIdAndUpdate({ _id: id }, { password: hashedPassword }, { new: true });

        if (!user) {
            return res.status(404).json({ status: false, message: "User not found." });
        }

        return res.status(200).json({ status: true, message: "Password changed successfully." });
    } catch (error) {
        console.error('Error updating password:', error);
        return res.status(500).json({ status: false, message: 'Internal server error.' });
    }
});


module.exports = userRouter;