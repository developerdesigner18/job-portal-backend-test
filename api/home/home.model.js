import mongoose from 'mongoose';
// import pkg from 'mongoose';
const { Schema } = mongoose;
const collectionName = 'home-info'
const homeSchema = Schema({
    title:String,
    home_images: [{
        name: String,
    }],
}, {
    timestamps: true
})
export const homeinfo = mongoose.model('home-info', homeSchema, collectionName)