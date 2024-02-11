const mongoose = require('mongoose');

const Schema = mongoose.Schema   //extracts the schema class from the imported mongoose module

const userSchema = new Schema({
  name: {
      type: String,
      required: true
  },
  email: {
      type: String,
      required: true,
  },
  password: {
      type: String,
      required: true
  },
  isPremiumUser: {
      type: Boolean,
      default: false,
  },
  totalExpenses: {
      type: Number,
      default: 0,
  },
});

const Users = mongoose.model('Users', userSchema);// here 'Users' is name of collection

module.exports = Users;