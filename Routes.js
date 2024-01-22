const express=require('express')
const route= express.Router()
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const secretkey="7ken"
const saltRound=10;
const auth=require('./auth')
let arr=[]

route.post('/register',(req,res)=>{
    data=req.body
    console.log(data)
    data.password=bcrypt.hashSync(data.password,saltRound)
    const acc=arr.find((item)=>item.email===data.email)
    if(acc){
        return res.send({msg:"email Already exist"});
    }


arr.push(data)
//console.log(arr)
const token=jwt.sign({user:data.email},secretkey)
res.send({msg:"user Registered Successfully",token:token})
})

route.post('/login',(req,res)=>{
data=req.body
const acc=arr.find((item)=>item.email===data.email)
if(acc){
    const login=bcrypt.compareSync(data.password,acc.password)

if(login){
    const token=jwt.sign({user:data.email},secretkey,{expiresIn:'365d'})
    console.log(login,"Login");
    return res.send({msg:"Login successful!!"})
}
else{
    return res.send({msg:"Password Incorrect"})
}
}
else{
    return res.send({msg:"You Havent Registered Yet"})
}
})

route.get('/home',(req,res)=>{
 res.send("Home Page")
})

route.get('/dashboard',auth,(req,res)=>{
 res.send({msg:"You can Access Dashboard"})
})

module.exports=route