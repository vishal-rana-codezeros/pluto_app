/**
 * This file will have request and response object mappings.
 *
 * Created by vishal 
 */

var _ = require("lodash");
const contstants = require("../constants");
const config = require('../config');


function registerMapping(params) {
    var respObj = {
        "responseMessage": "Successfully registered.",
        "responseCode" : 200,
        "userProfile":{
                id:params
        }
    };
    return respObj;
}
function userExist(){
    var respObj = {
        "responseMessage": "User already exist.",
        "responseCode": 400,
    }
    return respObj;
}
function loginMapping(user, jwt){
    var respObj = {
        "responseMessage": "Successfully Logged In.",
        "responseCode" : 200,
        "userProfile":{
                user:user,
                jwt:jwt
        }
    };

    return respObj;
}
function passwordMismatch(){
    var respObj = {
        "responseMessage": "Incorrect Password.",
        "responseCode": 500
    }
    return respObj;
}
function userNotExist(){
    var respObj = {
        "responseMessage": "User Not Found",
        "responseCode": 404
    }
    return respObj;
}
function internalServerError(){
    var respObj = {
        "responseMessage": "Internal Server Error.",
        "responseCode": 500
    }
    return respObj;
}
function emailSent(){
    var respObj = {
        "responseMessage": "New password has been sent to your email account.",
        "responseCode": 200
    }
    return respObj;
}
module.exports = {
    registerMapping,
    userExist,
    loginMapping,
    passwordMismatch,
    userNotExist,
    internalServerError,
    emailSent
};
