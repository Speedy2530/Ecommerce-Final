import express from 'express'; // ES module syntax | const express = require('express'); is the common js syntax
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

import cookieParser from 'cookie-parser';

//Postman: http client to make http requests to the backend

const port = process.env.PORT || 5000; //port for backend, frontend running on 3000, backend set to PORT

connectDB(); // connect to MongoDB

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

//Cookie parser middleware
app.use(cookieParser());

app.get('/', (req, res) => { 
    res.send('API is running...');
})

app.use('/api/products', productRoutes); //[1] route will go to [2] file
app.use('/api/users', userRoutes); 
app.use('/api/orders', orderRoutes);

app.get('/api/config/paypal', (req, res) => res.send({ clientId: process.env.PAYPAL_CLIENT_ID}))

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`))