//========================== Load Modules Start ===========================

//========================== Load external Module =========================
var _ = require("lodash");
//========================== Load Internal Module =========================
var appUtils = require("../appUtils");
var userConst = require("./userConstants");
var exceptions = require("../customExceptions");
//========================== Load Modules End =============================



//========================== Export Module Start ===========================

function register(req,res,next){

	let {fullName,userName,email,password,fb_id,type} = req.body;
	let error = [];
	if(!fullName){
		error.push({code:500,message: userConst.MESSAGES.NAME_CANT_EMPTY })
	}
	else if(!userName){
		error.push({code:500,message:userConst.MESSAGES.UserNameCantEmpty })
	}
	else if(!email){
		error.push({code:500,message:userConst.MESSAGES.EmailCantEmpty })
	}else if(!password){
		error.push({code:500,message:userConst.MESSAGES.PWD_CANT_EMPTY })
	}
	// else if(!validation.validateEmail(email)){
	// 	error.push({code:500,message: userConst.MESSAGES.InvalidEmail })
	// }
	// else if(fb_id){
	// 		error.push({code:500,message: userConst.MESSAGES.FbIdNotRequired })
	// }
	// else if(type && type == 'facebook'){
	// error.push({code:500,message:userConst.MESSAGES.TypeNormal})
	// }


	if(error.length >0){
		validationError(error,next);
	}else
	next();


}


var changeName = function(req,res,next){

    req.body.fullName = req.body.firstName + ' ' + req.body.lastName || '' ;

    next();
};


var validateLogin = function (req, res, next) {

    var {email,password} = req.body;
    // var { lat, lng, app_version, platform, ios_version } = req.headers;
    var errors = [];
    if (_.isEmpty(password)) {
        errors.push({ fieldName: "Password", message: userConst.MESSAGES.PWD_CANT_EMPTY });
    }
    email = req.body.email = _.toLower(email);
    if (_.isEmpty(email)) {
        errors.push({ fieldName: "email", message: userConst.MESSAGES.EmailCantEmpty });
    } else {
        if (!appUtils.isValidEmail(email)) {
            errors.push({ fieldName: "email", message: userConst.MESSAGES.InvalidEmail });
        }
    }
    if (errors && errors.length > 0) {
        validationError(errors, next);
    }

    next();
};


var validateUserId = function (req, res, next) {

    var { invitedByUserId } = req.body;
    var errors = [];
    if (_.isEmpty(invitedByUserId)) {
        errors.push({ fieldName: "invitedByUserId", message: userConst.MESSAGES.UserIdCantEmpty });
    }
    if (errors && errors.length > 0) {
        validationError(errors, next);
    }
    next();
};
var validateUsersId = function (req, res, next) {

    var { userId } = req.body;
    var errors = [];
    if (_.isEmpty(userId)) {
        errors.push({ fieldName: "userId", message: userConst.MESSAGES.UserIdCantEmpty });
    }
    if (errors && errors.length > 0) {
        validationError(errors, next);
    }
    next();
};
var validateGetConnectionPageList = function (req, res, next) {

    var { pageNo, count } = req.params;
    var errors = [];

    if (pageNo) {
        pageNo = req.body.pageNo = parseInt(pageNo);
    }

    if (count) {
        count = req.body.count = parseInt(count);
    }

    if (errors && errors.length > 0) {
        validationError(errors, next);
    }
    next();
};

var validationError = function (errors, next) {
    if (errors && errors.length > 0) {
        return next(exceptions.getCustomErrorException(userConst.MESSAGES.validationError, errors));
    }
    next();
};

module.exports = {
    validateLogin,
    requiredCheck:register,
    changeName,
    validateUserId,
    validateGetConnectionPageList,
    validateUsersId
};
//========================== Export module end ==================================
