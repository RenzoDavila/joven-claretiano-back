import { Schema, model, Document } from 'mongoose'

const schema = new Schema({
    description: String,
    color: String
});

export interface ITag extends Document {
    description: string;
    color: string;
}

export default model<ITag>('Tag', schema);