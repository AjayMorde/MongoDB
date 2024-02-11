const Expense=require('../models/expense');
const Users=require('../models/user');
const mongoose = require('mongoose'); 

// const sequelize= require('../connections/database');

const addExpense=async(req,res)=>{
    // const t=await    sequelize.transaction();  // create a new database transaction 
    // // console.log('========>t is ',t)

    const session = await mongoose.startSession();
    // console.log("Session started: ", session.id);
    session.startTransaction();

    function isValidData(data) {
        if (data == undefined || data.length === 0)
            return true;
        else {
            return false;
        }
        
    }
    
    
    try{
        const amount = req.body.Amount;                   // from here i extracts  all properties 
        const description = req.body.Description;
        const category = req.body.Category;
        const expenseDate = req.body.ExpenseDate; 
        const payment = req.body.Payment; 

        if (isValidData(amount) || isValidData(description) || isValidData(category)) {
             await session.abortTransaction();
             session.endSession();
             return res.status(400).json({ msg :'add parameters' })
        }

        const objectIdUserId = new mongoose.Types.ObjectId(req.user._id);

        const expenseValues=await Expense.create({         // here i create a new expense record in my database
            amount : amount ,
            description : description,
            category : category,
            expenseDate: expenseDate,  
            payment: payment,
            UserId: objectIdUserId  
        },{ session: session })     

        const totalExpenses =Number( req.user.totalExpenses) + Number(amount);
     
        const userUpdateResult = await Users.updateOne(
            { _id: objectIdUserId },
            { $set: { totalExpenses: Number(totalExpenses) } },
            { session: session }
          );
          if (userUpdateResult.modifiedCount !== 1) {
            throw new Error('User update failed');
          }
    
          await session.commitTransaction();
          session.endSession();
    
    

        res.status(200).json({Success: expenseValues});      
    }
    catch(err)
    {
        console.log(err);
        session.endSession();
        res.status(500).json({failed: "Error Occurred"});
    }
}

module.exports={addExpense}