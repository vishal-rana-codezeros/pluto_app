'use strict';

//========================== Load Modules Start =======================

//========================== Load internal modules ====================
var mongoose = require("mongoose");
var promise = require("bluebird");

var _ = require("lodash");
//========================== Load internal modules ====================
const User = require('./userModel');

// init user dao
let BaseDao = new require('../dao/baseDao');
const userDao = new BaseDao(User);


//========================== Load Modules End ==============================================

function checkIfExist(usrDetails){
    let query = {
        $or:[
             {email: usrDetails.email},
             {userName : usrDetails.userName}
        ]
    } 

    return userDao.findOne(query);
}

function registerUser(userInfo) {
    let user = new User(userInfo);
    return userDao.save(user);

}

function login(loginInfo) {
    let query = {};
    query.socialId = loginInfo.socialId;

    let update = {};
    update.deviceToken = loginInfo.deviceToken;
    update.updated = Date.now();

    let options = {};
    options.new = true;

   
    return userDao.findOneAndUpdate(query, update, options);
}

function reset_password(email,new_password){
    let query={};
    query.email = email;

    let update={};
    update.password = new_password;

    return userDao.findOneAndUpdate(query,update);
}

function searchUsers(){
     
}

//========================== Export Module Start ==============================

module.exports = {
    registerUser,
    checkIfExist,
    login,
    reset_password,
    searchUsers

};

//========================== Export Module End ===============================
