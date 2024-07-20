const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    taskName: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String },
    category: { type: String },
    date: { type: Date },
    status: { type: String, default: 'pending' },
    address: { type: String },
    price: { type: Number }
});

module.exports = mongoose.model('Task', TaskSchema);

