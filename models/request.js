const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    user: {
        type: Schema.ObjectId,
        required: true,
        ref: 'User'
    },
    city: {
        type: Schema.ObjectId,
        required: true,
        ref: 'City'
    },
    clinic: {
        type: Schema.ObjectId,
        required: true,
        ref: 'Clinic'
    },
    speciality: {
        type: Schema.ObjectId,
        required: true,
        ref: 'Speciality'
    },
    doctor: {
        type: Schema.ObjectId,
        required: true,
        ref: 'Doctor'
    },
    order_date: {
        type: Date,
        required: true,
    },
    sum: {
        type: Number,
        required: true,
    },
    services: {
        type: Number,
        required: true,
    },
    time_add: {
        type: Date,
        required: true,
    },
    appeal: {
        type: String,
        required: false
    },
    comment: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});

schema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Request', schema);