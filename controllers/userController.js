import emailValidator from 'email-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../schema/userSchema.js';

const cookieOptions = {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: true,
    sameSite: 'none'
}
export const signup = async (req, res) => {
    const { email, password, confirmPassword, id: documentId } = req.body;
    if (!email || !password || !confirmPassword) {
        return res.status(400).json({
            success: false,
            message: 'All the fields are required'
        })
    }
    if (!emailValidator.validate(email)) {
        return res.status(400).json({
            message: 'Email is invalid'
        })
    }
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
        return res.status(400).json({
            success: false,
            message: 'Email already exists! Go And Login'
        })
    }

    if (password !== confirmPassword) {
        return res.status(400).json({
            success: false,
            message: 'Password and confirm password does not match'
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
        email,
        password: hashedPassword,
        documentId
    })

    const token = await jwt.sign(
        {
            email: email,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRY
        }
    );
    res.cookie('token', token, cookieOptions)
    await user.save();
    return res.status(200).json({
        user,
        success: true,
        message: 'User has been successfully signed up'
    })
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'All the fields are required'
        })
    }
    if (!emailValidator.validate(email)) {
        return res.status(400).json({
            message: 'Email is invalid'
        })
    }
    const existingUser = await userModel.findOne({ email });

    if (!existingUser) {
        return res.status(400).json({
            success: false,
            message: `Email doesn't exist! Go and Signup first`
        })
    }

    if (!await (bcrypt.compare(password, existingUser.password))) {
        return res.status(400).json({
            message: 'Password is not correct'
        })
    }

    if (existingUser) {
        const token = await jwt.sign(
            {
                email: email,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRY
            }
        );
        res.cookie('token', token, cookieOptions)
        await existingUser.save();
        return res.status(200).json({
            existingUser,
            success: true,
            message: 'User has been successfully logged in'
        })
    }
}

export const logout = async (req, res) => {
    res.cookie('token', null, {
        secure: true,
        expires: new Date(Date.now() + 0),
        httpOnly: true,
        sameSite: "none"
    }).status(200).json({
        message: 'Successfully logged out',
        success: true,
    })
}
