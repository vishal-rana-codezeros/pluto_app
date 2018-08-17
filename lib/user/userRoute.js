const usrRoutr = require("express").Router();
const resHndlr = require("../responseHandler");
const middleware = require("../middleware");
const usrFacade = require("./userFacade");
const constants = require("../constants");
const jwtHandler = require("../jwtHandler");
const appUtil = require("../appUtils");
//const mediaUpload = require("../mediaupload/mediaUploadmiddleware");
const validators=require("./userValidators");





usrRoutr.route('/register')
.post([validators.validateRegister,validators.changeName],(req,res)=>{
    let userObj = req.body;
    usrFacade.signup(userObj).then((result)=> {
            resHndlr.sendSuccess(res, result);
        }).catch((err)=> {
             resHndlr.sendError(res, err);
        });
});




usrRoutr.route("/login")
    .post([validators.validateLogin],(req, res)=> {
        let {email,password} = req.body;
        usrFacade.login({
            email,
            password
        }).then((result)=>{
            // console.log("result in route==>"+JSON.stringify(result))
            resHndlr.sendSuccess(res, result);
        }).catch((err)=>{
             resHndlr.sendError(res, err);
        });
    });




module.exports = usrRoutr;
