const express=require('express');
require('dotenv').config();
const mongoose=require('mongoose');
const app=express();
const cors= require('cors');
const port =3000;

const mainPageRouter = require('./routes/mainpage');
const addUser = require('./routes/add-user');
const userName=require('./routes/getUsername');
const userLogin = require('./routes/user-login');
const addExpense = require('./routes/add-expense');
const getExpense = require('./routes/get-expense');
const deleteExpense = require('./routes/delete-expense');
const purchase = require('./routes/purchase');
const premiumFeatures = require('./routes/premiumFeatures');
const forgotPassword=  require('./routes/forgotPassword');
const report= require('./routes/reports');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(express.static('public'));


app.use(mainPageRouter)
app.use('/add-user', addUser);
app.use('/user-login', userLogin);
app.use('/getUser', userName); 
app.use('/add-expense', addExpense);
app.use('/get-expense', getExpense);
app.use('/delete-expense', deleteExpense);
app.use('/purchase', purchase);
app.use('/premiumuser', premiumFeatures);
app.use('/password', forgotPassword);
app.use('/report',report);

const  startServer= async()=> {
    try {
        await mongoose.connect('mongodb+srv://AJayMorde:sG7CvcBP0QR8gTwg@cluster0.d5mtchn.mongodb.net/?retryWrites=true&w=majority');
        app.listen(port,()=>{
            console.log("Server Is Started on port 3000");
        });
     
    } catch (err) {
        console.error(err);
    }
}

startServer();


