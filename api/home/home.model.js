import mongoose from 'mongoose';
// import pkg from 'mongoose';
const { Schema } = mongoose;
const collectionName = 'home-info'
const homeSchema = Schema({
    title:String,
    home_images: [{
        name: String,
        title: String
    }],
    rd3_zone:{
        title: String,
        description: String,
        job_portal:{
            title: String,
            description: String,
        },
        stadtmarketing: {
            title: String,
            description: String,
        },
        sportmarketing: {
            title: String,
            description: String,
        }
    },
    rd3_references:[{
        question: String,
        name: String,
        rd3_image: String,
        description: String,
        designation: String
    }]
}, {
    timestamps: true
})
export const homeinfo = mongoose.model('home-info', homeSchema, collectionName)