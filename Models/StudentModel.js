const mongoose = require('mongoose');
// const bcrypt = require("bcrypt")

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    },
    phone: {
        type: String,
    },
  role: {
    type: String,
    enum: ['student', 'teacher', 'admin'],
    default: 'student'
    },

});

// studentSchema.pre("save",async function (next){
//     const salt =await bcrypt.genSalt();
//     this.password=await bcrypt.hash(this.password,salt)
//     next();
// })

// studentSchema.statics.login = async function(email, password){
//     const user=await this.findOne({email});
//     if(user){
//         const auth=await bcrypt.compare(password, user.password)
//         if(auth){
//             return user;
//         }
//         throw Error("incorrect password")
//     }
//     throw Error("incorrect Email")
// }

module.exports = mongoose.model('Student', studentSchema);
