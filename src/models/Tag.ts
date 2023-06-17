import { Schema, model, Document } from 'mongoose'

const schema = new Schema({
    description: String,
    color: String,
    title: String,
});

export interface ITag extends Document {
    description: string;
    color: string;
    title: string;
}

export default model<ITag>('Tag', schema);