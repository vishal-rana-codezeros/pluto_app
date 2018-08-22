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
const nodemailer = require('node-mailer');

//========================== Load Modules End ==============================================


function signupUser(usrDetails){

    return userDao.checkIfExist(usrDetails).then((exist)=>{
     if(exist){
        return userMapper.userExist();
     }else{
         console.log(usrDetails);
            return userDao.registerUser(usrDetails).then((data)=>{
                return userMapper.registerMapping(data._id);
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

 function forgot_password(email){

    return userDao.checkIfExist(email)
        .then((exist)=>{
            if(exist){
                return AppUtil.getRandomPassword()
                    .then((randomPassword)=>{
                        return AppUtil.convertPass(randomPassword.toString()).then((new_password)=>{
                            return userDao.reset_password(email,new_password).then((updated_password)=>{
                                return updated_password;
                            })
                        });
                          
                    });
            }
            else{
                return userMapper.userNotExist();
            }
        })
 }
 function send_mail(email,new_password){

    var transporter = nodemailer.createTransport({
      pool: true,
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
          // type:'PLAIN',
          user: 'vishal.rana@codezeros.com', // generated ethereal user
          pass: 'codezero#' // generated ethereal password
      }
  })

  let mailOptions = {
     from: '"Codezeros 👻" <harshad.goswami@webcluesglobal.com>', // sender address
     to: email, // list of receivers
     subject: 'New Password request', // Subject line
     text: 'Please find your new password.', // plain text body
     html: `<b> ${new_password}</b>` // html body
};

// send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return userMapper.internalServerError();
        
      }else{
          return userMapper.emailSent();
  
     }
  });
}

 function search(searchInfo){
    return userDao.searchUsers(searchInfo).then()
 }



//========================== Export Module Start ==============================

module.exports = {
    signupUser,
    isUserExist,
    forgot_password,
    send_mail,
    search

};

//========================== Export Module End ===============================
