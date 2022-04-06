import mongoose from 'mongoose';
// import pkg from 'mongoose';
const { Schema } = mongoose;

const collectionName = 'boat-info'
const boatInfoSchema = Schema({
    cover_image: String,
    boat_type: String,
    boat_info: {
        name: String,
        width: String,
        mfg_year: String,
        manufacturer: String,
        guest_capacity: String,
        crew_capacity: String,
        engine_type: String,
        top_speed: String,
        interior: String,
        exterior: String,
        price: Number,
    },
    boat_images: [{
        name: String,
    }]
}, {
    timestamps: true
})

export const BoatInfo = mongoose.model('BoatInfo', boatInfoSchema, collectionName)