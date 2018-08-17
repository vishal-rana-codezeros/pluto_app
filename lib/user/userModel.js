// Importing mongoose
var mongoose = require("mongoose");
var constants = require('../constants');

/*var rootRef = firebase.database();*/

var Schema = mongoose.Schema;
var User;

var UserSchema = new Schema({
  fullName:{ type: String,required: true},
  firstName: { type: String, trim: true, required: true },
  lastName:{type:String},
  userName:String,
  email: { type: String,lowercase: true, trim: true },
  mobile:{type:String},
  dob:{type:Date},
  sex:{type:String},
  password:{
    type:String,
    required:function(){
      return (this.isSocialLogin) ? false : true
    }
  },
  profileImage:String,
  socialId:{
    type:String,
    required:function(){
      return (this.isSocialLogin) ? true : false
    }
  },
  socialType:String,
  deviceToken:String,
  isOrganizer:Number,
  isActive:{type:Number,default:1},
  isBlock: {status:Number,blockBy:{type:Schema.Types.ObjectId}},
  created: {type: Number, default: Date.now},
  updated: {type: Number, default: Date.now},
  favourites:[mongoose.Schema.Types.ObjectId],
  match:[mongoose.Schema.Types.ObjectId],
  no_liked:[mongoose.Schema.Types.ObjectId],
  location:[
    {
      long:String,
      lat:String,
      status:Number,
      isCurrent:Number
    }
  ],
  otp:String,
  otp_status:{type:String,enum:['PENDING','VERIFIED','EXPIRED']},
  profession:String,
  city:String,
  religion:String,
  country:String,
  isSocialLogin:Boolean,
  pictures:[String]
    },
    {
        versionKey: false
    });


UserSchema.methods.toJSON = function () {
    var obj = this.toObject();
    delete obj.isActive;
    delete obj.created;
    delete obj.updated;
    return obj;
};

UserSchema.methods.userExist = function (name) {
  return this.where({$or:[{userName:name },{email:name}]});
};
//Export user module
User = module.exports = mongoose.model(constants.DB_MODEL_REF.USER, UserSchema);

/*module.exports = rootRef*/
