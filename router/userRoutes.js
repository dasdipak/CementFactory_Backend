const express = require('express') 
const router = express.Router();
const User = require('../entity/userModel')  
const upload = require('../middleware/upload') 

const{check,validationResult} = require('express-validator');  
const bcryptjs = require('bcryptjs');

const jwt = require('jsonwebtoken')  

//registration of user
router.post('/user/register',
function(req,res){
  
   const fullname = req.body.fullname; 
    const phoneNumber = req.body.phoneNumber; 
    const username = req.body.username; 
    const email =  req.body.email;  
    const password = req.body.password;


    bcryptjs.hash(password,10,function(err,hash){ 
 
        const data= new User({
            fullname:fullname,
            phoneNumber:phoneNumber,
            username:username,
            email:email,
            password:hash
        })
        data.save()
        .then(function(result){ 
            res.status(201)
            .json({data: result ,success: true})
    })
        .catch(function(e){
            res.status(401).json({success:false})
        }) 
    })
    
   
})

//user login
router.post('/user/login', function(req,res){
    User.findOne({username:req.body.username}) 
.then(function(data){
if(data === null){  
    return res.status(401).json({errorMessage : "User not found", success:false})
}
bcryptjs.compare(req.body.password,data.password,
    function(err, cresult) {
        if(cresult === false){
            return res.status(401).json({errorMessage : "User not found",success:false})
        }
        
        //TOKEN
        const token = jwt.sign({UserId : data._id }, 'secretkey' )   
        res.status(200).json({success: true, data:data,token:token }) 
    })
})
.catch(()=>{
    res.status(501).json({success:false});
})})


router.post('/uploads/:id',upload.single('photo'),(req,res)=>{
    
    console.log(req.file)
    if(req.file===undefined){
        res.status(400).json({success:false});
    }else{
        const  photo = req.file.filename;
    User.findByIdAndUpdate({_id:req.params.id},{photo:photo}).then((photo)=>{
        console.log(photo);
        res.status(200).json({success:true});
    }).catch((ex)=>{
        res.status(501).json({success:false});

    })
    }
})

//Update Profile Photo
router.post('/updateImage/:id',upload.single('photo'),(req,res)=>{
    
    console.log(req.file)
    if(req.file===undefined){
        res.status(400).json({success:false});
    }else{
        const  photo = req.file.filename;
    User.findByIdAndUpdate({_id:req.params.id},{photo:photo}).then((photo)=>{
        console.log(photo);
        res.status(200).json({success:true});
    }).catch((ex)=>{
        res.status(501).json({success:false});

    })
    }
})


module.exports = router;  