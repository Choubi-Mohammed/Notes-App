const mongoose=require("mongoose")
const joi=require("joi")


const UsersSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        minlength:10,
        maxlength:60,
    },
    password:{
        type:String,
        required:true,
    },
    isAdmin:{
        type:Boolean,
        default : false,

    }
},{timestamps:true})
function ValidateLoginUser(obj){
    const Schema=joi.object({
        email:joi.string().min(10).max(60).required().email(),
        password:joi.string(),
    })
    return Schema.validate(obj)
}
function ValidateRegisterUser(obj){
    const Schema=joi.object({
        name:joi.string().min(5).max(60).required(),
        email:joi.string().min(10).max(60).required().email(),
        password:joi.string(),
        isAdmin:joi.bool(),
    })
    return Schema.validate(obj)
}
const NotesUsers=mongoose.model("NotesUsers",UsersSchema)
module.exports={
    NotesUsers,
    ValidateLoginUser,
    ValidateRegisterUser,
}