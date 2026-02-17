const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,"Name is required"],
    },
    email: {
        type: String,
        required: [true,"Email is required"],
        unique: [true,"Email already exists"],
        trim:true,
        lowercase:true,
        match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"Invalid email format"]
    },
    password: {
        type: String,
        required: [true,"Password is required"],
        minlength: [6,"Password must be at least 6 characters long"],
        select : false
    },
}, {
    timestamps: true
    
})
userSchema.pre('save', async function(next){
if(!this.isModified("password")){
    return next(); 
}
const salt = await bcrypt.genSalt(10);
this.password = await bcrypt.hash(this.password,salt);
next();
})
userSchema.methods.comparePassword = async function(Password){
    return await bcrypt.compare(Password,this.password);
}
const User = mongoose.model("User",userSchema);
module.exports = User;