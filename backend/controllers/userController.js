import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken'
import generateToken from '../utils/generateToken.js';

//Authenticates user and gets token
//route: Post /api/users/login
//access: public 
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    //checks if user exists (email checking)
    const user = await User.findOne({ email });


    if (user && await user.matchPassword(password)) {
        generateToken(res, user._id)
    
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } 
    else {
        res.status(401) //unauthorized
        throw new Error('Invalid email and/or password');
    }

    res.send('auth user');
})

//Register User
//route: POST api/users
//access: public 
const registerUser = asyncHandler(async (req, res) => {
    console.log('trying to register')
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists')
    }

    //make user
    const user = await User.create({
        name:name,
        email:email,
        password:password
    })


    if (user) {
        // console.log('hello')
        generateToken(res, user._id)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    }
    else {
        res.status(400)
        throw new Error('Invalid User Data')
    }
})

//Lougout user / clear cookie (JWT)
//route: POST /api/users/logout
//access: private (needs to be logged in to log out) 
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })

    res.status(200).json({ message: 'Logged out successfully' })
})

// Get user profile
//route: GET /api/users/profile
//access: private 
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
    })} else {
    res.status(404);
    throw new Error('User not found')
    }
})

//Update User profile
//route: PUT /api/users/profile ***NOTICE how its not in /:id. This is because we are using the token
//access: private 
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        })} 
        else {
            res.status(404);
            throw new Error('User not found')
        }
})


// Get all users
//route: GET /api/users
//access: private/ADMIN
const getUsers = asyncHandler(async (req, res) => {
    res.send('get users');
})

// Get user by ID
//route: GET /api/users/:id
//access: private/ADMIN
const getUserById = asyncHandler(async (req, res) => {
    res.send('get user by id');
})

//Delete Users
//route: DELETE /api/users/profile/:id
//access: private 
const deleteUser = asyncHandler(async (req, res) => {
    res.send('delete user profile');
})

//Update user (admin)
//route: PUT /api/users/:id
//access: private/ADMIN
const updateUser = asyncHandler(async (req, res) => {
    res.send('update user');
})

export {
    authUser,
    registerUser,
    logoutUser,
    getUserById,
    getUserProfile,
    updateUser,
    updateUserProfile,
    getUsers,
    deleteUser
}


