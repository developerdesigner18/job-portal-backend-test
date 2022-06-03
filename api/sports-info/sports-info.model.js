import mongoose from 'mongoose';
// import pkg from 'mongoose';
const { Schema } = mongoose;

const collectionName = 'sports-info'
const sportsschema = Schema({
//   blog api model
    cover_images: [{
        name: String,
    }],
    
    cover_image: String,
    blog_info: {
        name: String,
        description: String,
        fulltext:String,
    },

// travel api model 
    travel_images:[{
        name: String,
    }],
    cover_image_travel : String,
    travel_info:{
        name: String,
        description: String,
        player_names: String,
        Url:String, 
        flag:String,
    },
    filteroptions:String,
    user: {type: Schema.Types.ObjectId, ref: "UserInfo"},
}, {
    timestamps: true
})

export const sportsinfo = mongoose.model('sportsinfo', sportsschema, collectionName)