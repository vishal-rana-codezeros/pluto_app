// Importing mongoose
var mongoose = require("mongoose");
var constants = require('../constants');

var Schema = mongoose.Schema;
var User;
var UserSchema = new Schema({
  fullName:{ 
    type: String,
    required: true
  },
  firstName: { 
    type: String,
    trim: true, 
    required: true
   },
  lastName:{
    type:String
  },
  bio:String,
  userName:{
    type:String,
    required:true
  },
  email: { 
    type: String,
    lowercase: true,
    trim: true 
  },
  mobile:{
    code:String,
    num:String},
  age:{
    type:Number,
    required:true
  },
  sex:{
    type:String,
    enum:['MALE','FEMALE']
  },
  password:{
    type:String,
    required:function(){
      return (this.isSocialLogin) ? false : true
    }
  },
  profileImage:{
    name:String,
    format:String,
    height:String ,
    width:String,
    path:String
  },
  socialId:{
    type:String,
    required:function(){
      return (this.isSocialLogin) ? true : false
    }
  },
  socialType:{
    type:String,
    enum:["FB","TW"],
    required:function(){
      return (this.isSocialLogin) ? true : false
    }
  },
  deviceToken:{
    type:String,
    required:true
  },
  deviceType:{
    type:String,
    required:true,
    enum:["ANDROID","IOS"]
  },
  isOrganizer:{
    type:Number,
    default:0
  },
  isActive:{
    type:Number,
    default:1
  },
  isBlock: {
    status:Number,
    default:0,
    blockBy:
    {
      type:Schema.Types.ObjectId
    }
  },
  created: {
    type: Number,
     default: Date.now
    },
  updated: {
    type: Number,
     default: Date.now
    },
  favourites:[mongoose.Schema.Types.ObjectId],
  match:[mongoose.Schema.Types.ObjectId],
  disLike:[mongoose.Schema.Types.ObjectId],
  location:[
    {
      long:String,
      lat:String,
      status:{type:Number,default:1},
      isCurrent:Number,
      name: String,
    }
  ],
  otp:String,
  otp_status:{
    type:String,
    enum:['PENDING','VERIFIED','EXPIRED'],
    timeStamp:Number
  },
  profession:String,
  city:{
    lat:String,
    lng:String,
    name:String
  },
  religion:String,
  country:{
    name:String,
    countryCode:String
  },
  isSocialLogin:{
    type:Boolean,
    default:false
  },
  notification:[mongoose.Schema.Types.ObjectId],
  pictures:[String],
  profileSetting:{
      gender:{type:String, enum:['MALE','FEMALE'] },
      ageRange:{
        startRange:{type:Number,default:18},
        endRange:{type:Number,default:25}
      },
      distance:{
        minDistance:{type:Number,default:0},
        maxDistance:{type:Number,default:5}
      },
      notificationFlags:{
          message:{
            type:Number,
            default:1
          },
          match:{
            type:Number,
            default:1
          },
          likes:{
            type:Number,
            default:1
          }
        },
      }
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
