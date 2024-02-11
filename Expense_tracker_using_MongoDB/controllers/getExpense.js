const Expense = require('../models/expense');  

const getAllExpense = async (req, res) => {
    try {
        const data = await Expense.find( {UserId:req.user._id} );   // only those expense which id of that Expense match with User id        

        res.status(200).json({ data: data })
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ failed: "Error Occurred" });
    }
}

module.exports = { getAllExpense }