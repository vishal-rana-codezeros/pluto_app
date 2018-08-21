var mongoose = require("mongoose");
var constants = require('../constants');

var Schema = mongoose.Schema;
var Notifications;
var notificationSchema = new Schema({
        type:{ 
            type:String,
            enum:['MEETING','CHAT','OTHER']
             },
        status:{
             type:String,
             enum:['PENDING','ACCEPTED','REJECTED'] ,
             default:'PENDING'
            },
        isActive:{type:Boolean,default:true},    
        message:String,
        timestamp:{type:Number,default:Date.now}, 
        meeting_lat:String,
        meeting_lng:String,
        is_pinned:Boolean,
        sent_by:{
             type: mongoose.Schema.Types.ObjectId,
             ref:constants.DB_MODEL_REF.USER 
            },
        sent_to:{
             type: mongoose.Schema.Types.ObjectId,
             ref:constants.DB_MODEL_REF.USER 
            }
});

//Export user module
Notifications = module.exports = mongoose.model(constants.DB_MODEL_REF.NOTIFICATIONS, notificationSchema);

/*module.exports = rootRef*/