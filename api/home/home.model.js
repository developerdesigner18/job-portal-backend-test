import mongoose from 'mongoose';
// import pkg from 'mongoose';
const { Schema } = mongoose;

const collectionName = 'home'
const homeSchema = Schema({
    image_1: String,
    content: {
        tag_line: String,

    }
}, {
    timestamps: true
})

export const home = mongoose.model('home', homeSchema, collectionName)