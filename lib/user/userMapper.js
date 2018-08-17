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

module.exports = {
    registerMapping
};
