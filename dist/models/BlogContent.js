"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    title: String,
    paragrap: Number,
    text: String,
    multimediaType: String,
    multimediaPosition: String,
    imagePath: String
});
exports.default = mongoose_1.model('BlogContent', schema);
