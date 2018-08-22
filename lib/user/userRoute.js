const usrRoutr = require("express").Router();
const resHndlr = require("../responseHandler");
const middleware = require("../middleware");
const usrFacade = require("./userFacade");
const constants = require("../constants");
const jwtHandler = require("../jwtHandler");
const appUtil = require("../appUtils");
//const mediaUpload = require("../mediaupload/mediaUploadmiddleware");
const validators=require("./userValidators");


// usrRoutr.route('/register')
// .post([validators.validateRegister,validators.changeName],(req,res)=>{
//     let userObj = req.body;
//     usrFacade.signup(userObj).then((result)=> {
//             resHndlr.sendSuccess(res, result);
//         }).catch((err)=> {
//              resHndlr.sendError(res, err);
//         });
// });

usrRoutr.route('/register')
.post([validators.requiredCheck,appUtil.convertPass],(req,res)=>{
    
    let userObj = req.body;
    usrFacade.signup(userObj).then((result)=> {
            resHndlr.sendSuccess(res, result);
        }).catch((err)=> {
            console.log("error:",err);
             resHndlr.sendError(res, err);
        });  
    
});

usrRoutr.route('/login')
.post([validators.validateLogin],(req,res)=>{

    let userObj={
        email,
        password,
        userName
    } = req.body;
    usrFacade.login(userObj).then((result)=>{
        resHndlr.sendSuccess(res, result);
    }).catch((err)=>{
        resHndlr.sendError(res, err);
    });
});

usrRoutr.route('/forgot_password')
.post((req,res)=>{ 
    let email=req.body.email
    usrFacade.forgot_password(email).then((updated_password)=>{
        usrFacade.send_mail(email,updated_password).then(result => {
            
            //obj.message;
            if(result.error){
                resHndlr.sendError(res,result.error);
            }else{
                resHndlr.sendSuccess(res, result);
            }   

        });
    })

 });

 usrRoutr.route('/search')
 .post((req,res)=>{
     let userObj= {
         isActive,
         isMatch,
         dislike,
         location,
         age
     }=req.body;
     usrFacade.search(userObj).then()

 })

// usrRoutr.route("/login")
//     .post([validators.validateLogin],(req, res)=> {
//         let {email,password} = req.body;
//         usrFacade.login({
//             email,
//             password
//         }).then((result)=>{
//             // console.log("result in route==>"+JSON.stringify(result))
//             resHndlr.sendSuccess(res, result);
//         }).catch((err)=>{
//              resHndlr.sendError(res, err);
//         });
//     });




module.exports = usrRoutr;
