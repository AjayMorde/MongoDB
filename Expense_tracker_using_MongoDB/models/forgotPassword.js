const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const forgotPasswordSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        auto: true,
        required: true
    },
    active: {
        type: Boolean,
        default: false
    }
});

const ForgotPassword = mongoose.model('ForgotPassword', forgotPasswordSchema);

module.exports = ForgotPassword;
