"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Models
const Tag_1 = __importDefault(require("../models/Tag"));
async function getTags(req, res) {
    const tags = await Tag_1.default.find();
    return res.json(tags);
}
exports.getTags = getTags;
;
async function createTag(req, res) {
    const { color, description } = req.body;
    const newTag = { color, description };
    const tag = new Tag_1.default(newTag);
    await tag.save();
    return res.json({
        message: 'Tag Saved Successfully',
        tag
    });
}
exports.createTag = createTag;
;
async function getTag(req, res) {
    const { id } = req.params;
    const tag = await Tag_1.default.findById(id);
    return res.json(tag);
}
exports.getTag = getTag;
async function deleteTag(req, res) {
    const { id } = req.params;
    const tag = await Tag_1.default.findByIdAndRemove(id);
    if (tag) {
        return res.json({ message: 'Tag Deleted' });
    }
    else {
        return res.json({ message: 'Error' });
    }
}
exports.deleteTag = deleteTag;
;
async function updateTag(req, res) {
    const { id } = req.params;
    const { color, description } = req.body;
    const updatedTag = await Tag_1.default.findByIdAndUpdate(id, {
        color,
        description
    });
    return res.json({
        message: 'Successfully updated',
        updatedTag
    });
}
exports.updateTag = updateTag;
