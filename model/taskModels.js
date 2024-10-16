const mongoose = require('mongoose');
const TaskSchema = mongoose.Schema;

const Tasks = new TaskSchema({
    name:{
        type:String,
        required:true
    },
    completed:{
        type:Boolean,
        default:false
    }
},{timestamps: true})

module.exports = mongoose.model('task',Tasks);