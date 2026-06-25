const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true
    },
    originalURL: {
        type: String,
        required: true
    },
    createdBY: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    visitHistory: [{ timestamp: { type: Number } }],
    
}, { timestamps: true }
);

const URL = mongoose.model("url", urlSchema);   
module.exports = URL;