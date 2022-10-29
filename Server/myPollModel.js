const mongoose = require("mongoose")

const tableSchema = new mongoose.Schema({
    q:{
        type:String,
        required:true
    },
    o1:{
        type:String,
        required:true
    },
    o2:{
        type:String,
        required:true
    },
    o3:{
        type:String,
        required:true
    },
    o4:{
        type:String,
        required:true
    },
    co1:{
        type:Number,
        required:false
    },
    co2:{
        type:Number,
        required:false
    },
    co3:{
        type:Number,
        required:false
    },
    co4:{
        type:Number,
        required:false
    }
});

const myPollModel = mongoose.model("pollTable",tableSchema);

module.exports=myPollModel;