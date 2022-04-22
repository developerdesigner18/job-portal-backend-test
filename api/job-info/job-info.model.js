import mongoose from 'mongoose';
// import pkg from 'mongoose';
const { Schema } = mongoose;

const collectionName = 'job-info'
const jobinfoSchema = Schema({
    cover_image: String,
    job_type: String,
    job_info: {
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
    job_images: [{
        name: String,
    }],
    status: String
}, {
    timestamps: true
})

export const jobinfo = mongoose.model('jobinfo', jobinfoSchema, collectionName)