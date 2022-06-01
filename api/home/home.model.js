import mongoose from 'mongoose';
// import pkg from 'mongoose';
const { Schema } = mongoose;

const collectionName = 'home'
const homeSchema = Schema({
    tagline:String,
    home_images: [{
        name: String,
    }],
}, {
    timestamps: true
})

export const home = mongoose.model('home', homeSchema, collectionName)