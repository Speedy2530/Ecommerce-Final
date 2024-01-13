import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {

    //creates jwt token, taking in payload, secret, expiration
    const token = jwt.sign({ userId }, 
    process.env.JWT_SECRET, {
        expiresIn: '30d' //30 days, can change it
    }); 

    // Set jwt as HTTP-only cookie
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development', //would be true in production, adds 's' to 'https'
        sameSite: 'strict',
        maxAge: 30*24*60*60*1000 //30 days in Miliseconds
    })
}

export default generateToken;