const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    city_id: {
        type: Schema.ObjectId,
        required: true,
        ref: 'City'
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

module.exports = mongoose.model('Clinic', schema);