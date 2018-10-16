const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    clinic_id: {
        type: String,
        required: true
    },
    activate: {
        type: Boolean,
        required: true,
        default: true
    },
    note: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});

schema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Speciality', schema);