const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    service: { type: String, required: true }, 
    date: { type: Date, required: true },
    address: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', BookingSchema);
