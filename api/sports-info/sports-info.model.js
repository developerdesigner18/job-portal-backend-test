import mongoose from 'mongoose';
// import pkg from 'mongoose';
const { Schema } = mongoose;

const collectionName = 'sports-info'
const sportsschema = Schema({
    cover_image: String,
    blog_info: {
        name: String,
        description: String,
    },
}, {
    timestamps: true
})

export const sportsinfo = mongoose.model('sportsinfo', sportsschema, collectionName)