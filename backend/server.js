import path from 'path';
import express from 'express'; // ES module syntax | const express = require('express'); is the common js syntax
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

import cookieParser from 'cookie-parser';

//Postman: http client to test for results from http requests to the backend

const port = process.env.PORT || 5000; 

connectDB(); // connect to MongoDB

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

//Cookie parser middleware
app.use(cookieParser());

app.use('/api/products', productRoutes); //[1] route will go to [2] file
app.use('/api/users', userRoutes); 
app.use('/api/orders', orderRoutes);

app.get('/api/config/paypal', (req, res) => res.send({ clientId: process.env.PAYPAL_CLIENT_ID}))

if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve();

    app.use(express.static(path.join(__dirname, '/frontend/build')));
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    );
  } else {
    app.get('/', (req, res) => {
      res.send('API is running....');
    });
  }


app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`))