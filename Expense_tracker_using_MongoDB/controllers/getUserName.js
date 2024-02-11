// controllers/getUserName.js
const Users = require('../models/user');

const getName = async (req, res) => {
  try {
      const loggedInUserId = req.user._id; // Assuming the logged-in user's ID is available in req.user.id
      // console.log('1===============================================',loggedInUserId)

      if (!loggedInUserId) {
          return res.status(400).json({ error: 'User ID not provided' });
      }

      const loggedInUser = await Users.findById(loggedInUserId);
      // console.log('2=========================loginged is errorrrrr========================',loggedInUser)

      if (!loggedInUser) {
          return res.status(404).json({ error: 'User not found' });
      }

      const loggedInUserName = loggedInUser.name; // Accessing the 'Name' column from the retrieved user
      const totalAmount=loggedInUser.totalExpenses;
    //   console.log('--------------------->',totalAmount)
      // console.log('3=========================loginged is errorrrrr========================',loggedInUserName)

      res.status(200).json({ loggedInUserName,totalAmount });
  } catch (error) {
      console.error('Error fetching logged-in user name:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};



module.exports = { getName };
