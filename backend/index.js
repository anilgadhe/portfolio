require("dotenv").config();
const express = require("express");
const cors = require("cors");
const User =  require("./models/user");
const mongoose = require("mongoose");
const app = express();
const PORT = 8000;



connection(process.env.Mongo_URL).then(()=>{
    console.log("successfully connected with atlas");
    
})
.catch((err)=>{
    console.log(`failed to connect: ${err}`);
    
})

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.get("/",(req,res)=>{
    res.send("home route");
})

app.post("/register",async(req,res)=>{
try {
    const {userName, email , message} = req.body;
    
     const newUser = new User({
           userName,
           email,
           message,
     })

     await newUser.save();
     res.status(200).json({msg:"resgisterd successfully!",user:newUser.userName});
} catch (error) {
    res.status(400).json(error);
}
})

app.use((req,res)=>{
    res.status(400).json("page Not Found");
})


async function connection(url){
    await mongoose.connect(url);
}

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
    
})



