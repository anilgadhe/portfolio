const {model , Schema} = require("mongoose");

const userSchema = new Schema({
   userName:{
    type:String,
     required:true, 
   } ,

   email:{
    type:String,
    required:true,
   },
    message:{
       type:String,
       required:true,
   }
},{timestamps:true});

const User = new model('User',userSchema);

module.exports= User;