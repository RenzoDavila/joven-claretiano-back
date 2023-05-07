import { Schema, model, Document } from 'mongoose'

const schema = new Schema({
    title: String,
    description: String,
    imagePath: String
});

export interface IBlog extends Document {
    title: string;
    description: string;
    imagePath: string;
}

export default model<IBlog>('Blog', schema);