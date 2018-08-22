'use strict';

//========================== Load Modules Start =======================

//========================== Load external modules ====================
var promise = require("bluebird");
//========================== Load internal modules ====================
// Load user service
var _ = require("lodash");
const usrService = require('./userService');
const jwtHandler = require('../jwtHandler');
const AppUtil   = require('../appUtils');
// const redisClient = require("../redisClient/init");
const customExceptions = require('../customExceptions');
const userMapper = require('./userMapper');
//========================== Load Modules End ==============================================

/**
 * @function signup
 * signup via email
 */

function signup(signupInfo){
    return usrService.signupUser(signupInfo)
        .then((result)=>{
                return result   ;
        });
}


/**
 * @function login
 * login via email
 * @param {Object} loginInfo login details
 */


function login(loginInfo) {
    return usrService.isUserExist(loginInfo)
        .then(function (isExist) {
            if (isExist) {
                return AppUtil.verifyPassword(loginInfo,isExist).then((valid)=>{
                    if(valid){
                                 return jwtHandler.genUsrToken({name:isExist.fullName,userId : isExist._id,email : isExist.email}).then((jwt)=>{
                                     return userMapper.loginMapping({ user: isExist, jwt: jwt});
                             });

                    }else{
                    return userMapper.passwordMismatch();
                    }
                });
            } else {
                return userMapper.userNotExist();
            }
        });

}
function forgot_password(email){
    return usrService.forgot_password(email)
        .then((result)=>{
            return result;
        });
}
function send_mail(email,updated_password){
    return usrService.send_mail(email,updated_password);

}

function search(searchInfo){
    return usrService.search(searchInfo).then()

    
}
// function forgot_password(email){

//     return usrService.isUserExist(email)
//         .then(function (isExist){
//             if (isExist){
//                  return AppUtil.getRandomPassword().then((randomPassword)=>{
//                      cb(null,randomPassword.toString())
//                  });
//                  return AppUtil.convertPass(randomPassword)
//             }
//         })
// }
//========================== Export Module Start ==============================

module.exports = {
    signup,
    login,
    forgot_password,
    send_mail

};

//========================== Export Module End ===============================
