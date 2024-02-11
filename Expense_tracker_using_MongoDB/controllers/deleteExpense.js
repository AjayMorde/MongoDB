const Expense = require('../models/expense');
const Users = require('../models/user');
// const sequelize=require('../connections/database');
const mongoose = require('mongoose'); 

const deleteExpense = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const expenseId = req.params.id;
    console.log('expense id is ', req.params)


    if (expenseId == undefined || expenseId.length === 0) {
      return res.status(400).json({ success: false });
    }
    const expense = await Expense.findById(expenseId);
    

    if (!expense) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ success: false, message: 'Expense not found' });
    }


 


    await Users.findByIdAndUpdate(
      new mongoose.Types.ObjectId(req.user._id),
      {
          $inc: { totalExpenses: -expense.amount }
      },
      { session }
  );

  await Expense.deleteOne({ _id: new mongoose.Types.ObjectId(expenseId), UserId: new mongoose.Types.ObjectId(req.user._id) }, { session });

  await session.commitTransaction();
  session.endSession();

  return res.status(200).json({
      success: true,
      message: 'Deleted Successfully'
  });
  }
  catch (err) {
    console.log(err);
    res.status(400).json({ failed: "Error Occurred" });
  }
}

module.exports = { deleteExpense }