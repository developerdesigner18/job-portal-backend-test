import mongoose from 'mongoose';
// import pkg from 'mongoose';
const { Schema } = mongoose;

const collectionName = 'pages'
const pagesSchema = Schema({
    page: String,
    media: {
        landing_video: String,
        image_1: String
    },
    content: {
        tag_line: String,
        heading_1: String,
        description_1: String,
        heading_2: String,
        sub_heading_2: String,
        description_2: String,
        heading_3: String,
        description_3: String,
    }
}, {
    timestamps: true
})

export const Pages = mongoose.model('Pages', pagesSchema, collectionName)