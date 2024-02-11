const Users = require('../models/user');
const bcrypt = require('bcrypt');
// const mongoose = require('mongoose'); 

const addUser = async (req, res) => {
    try {
        const name = req.body.Name;
        const email = req.body.Email;
        const password = req.body.Password;

        if (!name || !email || !password) {
            return res.status(400).json({ err: 'Bad Parameters' });
        }

        // password Hashing
        const hashedPassword = await bcrypt.hash(password, 10);

        

        await Users.create({ name, email, password: hashedPassword });

        return res.status(200).json({ msg: 'Successfully created a new user' });

    } catch (error) {
        console.error('Error adding user:', error); // Logging error
        res.status(500).json({ msg: 'Something went wrong' });
    }
};

module.exports = { addUser };
