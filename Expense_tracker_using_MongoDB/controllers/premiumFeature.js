// const Expense = require('../connections/expense');
const Users = require('../models/user');
// const sequelize = require('../connection/database');

const getUserLeaderBoard = async (req, res) => {
    try{
       

        const leaderboardOfUsers = await Users.findAll({
            attributes: ['Name', 'totalExpenses'],
            order: [['totalExpenses', 'DESC']],
          });
          console.log('======================================================================>>',leaderboardOfUsers);
          res.status(200).json(leaderboardOfUsers)

        }
catch (err){
    console.log(err)
    res.status(500).json(err)
}
}

module.exports = {getUserLeaderBoard }