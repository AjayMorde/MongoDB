const Users = require('../models/user');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');


// generating a token here

function  generateAccessToken(id,name , ispremiumuser){
    return jwt.sign({userId:id,name:name, ispremiumuser},process.env.JWT_SECRET)
    
}

const userLogin = async (req, res) => {

    function isDataValid(data) {
        if (data == undefined || data.length === 0) {
            return true;
        } else {
            return false;
        }
    }
    try {
        const email = req.body.email;
        const password = req.body.password;

        if (isDataValid(email) || isDataValid(password)) {
            res.status(402).json({ msg: 'Bad Parameters' })
        }

        const user = await Users.findOne({email})
        // console.log('----------------------------------->',user)

        if (!user) {
            console.log('User not found');
            res.status(404).json({ msg: 'User does not exist' });
        } 
        else {
            // here comparing a hashing password 
            const checkPassword = await bcrypt.compare(password, user.password);

            if (!checkPassword) {
                console.log('Wrong password');
                res.status(401).json({ msg: 'Wrong password' });
            } else {
                console.log('Login successful');
                res.status(200).json({ msg: "user log-in successfully",token: generateAccessToken(user.id,user.Name, user.ispremiumuser) });
            }
        }

    }
    catch (err) {

        console.error('Error:', err);
        res.status(500).json({ msg: ' An error occurred.' });

    }
}
module.exports = { 
    userLogin ,
    generateAccessToken
};