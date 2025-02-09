const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        lowercase : true,
        unique : true,
        trim : true,
        validate :  {
            validator : (value) => {
                return validator.isEmail(value)
            },
            message : (props) => `${props.value} is not a valid email address`

        }
    },
    fullName : {
        type : String,
        required : true,
        trim : true
    },
    password : {
        type : String,
        required : true,
        trim : true,
        minlength : 6,
        select : false
    },
    profilePic : {
        type : String,
        default : ""
    }
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema);

module.exports = User;