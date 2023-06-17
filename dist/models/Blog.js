"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    title: String,
    views: Number,
    content: [{
            description: Number,
            text: String,
            multimediaType: String,
            multimediaPosition: String,
            imagePath: String
        }],
    tag: String,
    tagDesc: String,
    dateEdited: Date,
    dateCreated: Date,
    principalImagePath: String,
    state: String,
});
exports.default = mongoose_1.model('Blog', schema);
