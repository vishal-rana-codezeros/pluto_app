'use strict';

//========================== Load Modules Start =======================
//========================== Load internal modules ====================
const promise = require("bluebird");
//========================== Load internal modules ====================

// Load user dao
var _ = require("lodash");
const userDao = require('./userDao');
const AppUtil   = require('../appUtils');
const userMapper = require('./userMapper');
//========================== Load Modules End ==============================================


function signupUser(usrDetails){

    return userDao.checkIfExist(usrDetails).then((exist)=>{
     if(exist){
        return  userMapper.userExist();
     }else{
        return AppUtil.generateSaltAndHashForPassword(usrDetails.password).then((result)=>{
         if(result){
            usrDetails.password = result;//hash password stored in userDetails
            return userDao.registerUser(usrDetails).then((data)=>{
                return userMapper.registerMapping(data._id);
                    });
            }
        });
    }
    }) ;
 
    }
 function isUserExist(details){
    return userDao.checkIfExist(details)
    .then((result) => {
        return result;
    });
 }

 
//========================== Export Module Start ==============================

module.exports = {
    signupUser,
    isUserExist

};

//========================== Export Module End ===============================
