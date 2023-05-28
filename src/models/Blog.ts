import { Schema, model, Document } from 'mongoose'

const schema = new Schema({
    title: String,
    views:  Number,
    content: [{
        description: Number,
        text: String,
        multimediaType: String, //N=none I=imagen V=video
        multimediaPosition: String, //F=full L=left R=right
        imagePath: String
    }],
    tag: String,
    tagDesc: String,
    fecha: String,
    principalImagePath: String,
});

export interface IBlog extends Document {
    title: string;
    views:  number;
    content: [{
        description: number;
        text: string;
        multimediaType: string; //N=none I=imagen V=video
        multimediaPosition: string; //F=full L=left R=right
        imagePath: string
    }];
    tag: string;
    tagDesc: string;
    fecha: string;
    principalImagePath: string;
}

export default model<IBlog>('Blog', schema);