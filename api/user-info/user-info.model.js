import mongoose from 'mongoose';
// import pkg from 'mongoose';
const { Schema } = mongoose;

const collectionName = 'users'
const userInfoSchema = Schema({
    firstName: String,
    lastName: String,
    userName: String,
    emailId: String,
    password: String,
    mobileNo: Number,
    country: String,
    state: String,
    city: String,
    theme: String,
}, {
    timestamps: true
})

export const UserInfo = mongoose.model('UserInfo', userInfoSchema, collectionName)