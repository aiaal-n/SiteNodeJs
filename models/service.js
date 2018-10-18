const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    speciality: {
        type: Schema.ObjectId,
        required: true,
        ref: 'Speciality'
    },
    parent_id: {
        type: Number,
        required: false
    },
    name: {
        type: String,
        required: false
    },
    order: {
        type: Number,
        required: false
    },
    level: {
        type: Number,
        required: false
    },
    children_count: {
        type: Number,
        required: false
    },

}, {
    timestamps: true
});

schema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Service', schema);