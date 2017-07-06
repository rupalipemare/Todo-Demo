var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var taskSchema = new Schema({
    user_id: {type: String, required: [true, '{PATH is required}']},
    title: {
        type: String,
        required: [true, '{PATH is required}']
    },
    description: {type: String, required: [true, '{PATH is required}']},
    status: {type: String, required: [true, '{PATH is required}'], default: 'Pending', enum: ['Pending', 'Completed'],},
    created_at: {type: Date, default: Date.now},
});

taskSchema.pre('save', function (next) {
    var self = this;
    mongoose.models["Task"].findOne({title: self.title}, function (err, task) {
        if (!task) {
           next();
        } else {
            if(self.__v != undefined && task._id.equals(self._id)){
                return next();
            }else {
                next(new Error("Title already exists!"));
            }
        }
    });
});

taskSchema.statics = {};
taskSchema.methods = {};

var Task = mongoose.model('Task', taskSchema);

module.exports = Task;