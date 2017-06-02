var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var taskSchema = new Schema({
    user_id: {type: String, required: [true, '{PATH is required}']},
    title: {
        type: String,
        validate: {
            validator: function (v) {
                return /^[a-zA-Z]+$/.test(v);
            },
            message: '{PATH} must have letters only!'
        },
        required: [true, '{PATH is required}']
    },
    description: {type: String, required: [true, '{PATH is required}']},
    status: {type: String, required: [true, '{PATH is required}'], default: 'Pending', enum: ['Pending', 'Completed'],},
    created_at: {type: Date, default: Date.now},
});

taskSchema.statics = {};
taskSchema.methods = {};

var User = mongoose.model('Task', taskSchema);

module.exports = User;