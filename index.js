const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
mongoose.connect("mongodb://127.0.0.1:27017/Employee");
const productSchema = new mongoose.Schema({
    name:String,
    number:String,
    email:String,
    branch:String,
    state:String,
    department:String

});
const Users = new mongoose.model("details",productSchema);

app.post("/",async(req,res)=>{
    res.send(req.body);
   try{
    let user = new Users(req.body);
    let result = await user.save();
    res.send(result);

   }catch{
    console.log("No register employee");
   }
});
app.get("/dash",async(req,res)=>{
    let member = await  Users.find();
    if(member.length>0){
        res.send(member);
    }
    else{
        res.send({result:"No member found"});
    }
}); 
app.get("/dash/:id",async(req,res)=>{
    let result = await Users.findOne({_id:req.params.id});
    if(result){
        res.send(result);
    }
    else{
        res.send({result:"No user found"});
    }
})
app.listen(5000); 