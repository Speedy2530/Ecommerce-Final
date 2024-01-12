import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';

//Authenticates user and gets token
//route: Post /api/users/login
//access: public 
const authUser = asyncHandler(async (req, res) => {
    res.send('auth user');
})


//Register User
//route: GET /api/users/login
//access: public 
const registerUser = asyncHandler(async (req, res) => {
    res.send('register user');
})
