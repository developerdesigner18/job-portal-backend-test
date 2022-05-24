import mongoose from 'mongoose';
// import pkg from 'mongoose';
const { Schema } = mongoose;

const collectionName = 'sports-info'
const sportsschema = Schema({
    cover_images: [{
        name: String,
    }],
    cover_image: String,
    blog_info: {
        name: String,
        description: String,
    },
    
    cover_image_travel : String,
    travel_info:{
        name: String,
        description: String,
        Url:String
    },
    user: {type: Schema.Types.ObjectId, ref: "UserInfo"},
}, {
    timestamps: true
})

export const sportsinfo = mongoose.model('sportsinfo', sportsschema, collectionName)