//seeding: populating database with predefined data for testing

import mongoose from "mongoose";
import dotenv from "dotenv";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js"; //making queries to database is always done through models
import Product from "./models/productModel.js";
import Order from "./models/orderMode.js";
import connectDB from "./config/db.js";

dotenv.config(); //using global env variables
connectDB(); //connecting to database

const importData = async () => {
    try {
        //make sure nothing's there to start
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const createdUser = await User.insertMany(users); //returns array of users
        
        const adminUser = createdUser[0]._id;

        const sampleProducts = products.map((product) => {
            return { ...product, user: adminUser};
        })

        await Product.insertMany(sampleProducts);

        console.log('Data Imported!')

        process.exit(); 
    } catch (error) {
        console.error(`${error}`);
        process.exit(1); //putting a 1 in kills the process
    }
}

const destroyData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1); 
    }
}

if(process.argv[2] === '-d') { //if the second part of the 'node backend/seeder ___' is -d//
    destroyData();
} else {
    importData();
}
