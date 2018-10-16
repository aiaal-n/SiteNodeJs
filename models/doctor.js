const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    lastName: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    secondName: {
        type: String,
        required: false
    },
    birthdate: {
        type: Date,
        required: true
    },
    username: {
        type: String,
        required: true,
        index: { unique: true }
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    city_id: {
        type: Number,
        required: true
    },
    spec_id: {
        type: Number,
        required: true
    },
    clinic_id: {
        type: Number,
        required: true
    },
    activate: {
        type: Boolean,
        required: true,
        default: true
    },
}, {
    timestamps: true
});

schema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Doctor', schema);