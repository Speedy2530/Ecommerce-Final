import express from 'express'; // ES module syntax | const express = require('express'); is the common js syntax
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import productRoutes from './routes/productRoutes.js';

//Postman: http client to make http requests to the backend

const port = process.env.PORT || 5000; //port for backend, frontend running on 3000, backend set to PORT

connectDB(); // connect to MongoDB

const app = express();

app.get('/', (req, res) => { 
    res.send('API is running...');
})

app.use('/api/products', productRoutes); //[1] route will go to [2] file

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`))