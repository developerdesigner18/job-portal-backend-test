import { sportsinfo } from "./sports-info.model.js"
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { response } from "express";


// Blog Info apis

export const insertbloginfo = async (req, res) => {
    try {

        const content = req.body
        const media = req.files

        const data = new sportsinfo({
            cover_image: media.cover_image != undefined ? media.cover_image[0].filepath + media.cover_image[0].filename : '',
            blog_info: {
                name: content.name,
                description:content.description
            },
            user:content.user
            
        })      
        const sportsinfoData = await sportsinfo.create(data)
        res.status(201).send({
            success: true,
            data: sportsinfoData,
            message: 'blog-info inserted successfully',
        })
    }
    catch (err) {
        res.status(401).send({
            success: false,
            message: 'blog-info.controller: ' + err.message
        });
    }
}


export const updateBlogInfo = async (req, res) => {
    console.log("=================== called")
    try {
        const blog_id = req.query.blog_id
        const content = req.body
        const media = req.files

        const currentData = await sportsinfo.findById(blog_id).lean().exec();
        let cover_image;
        cover_image = media.cover_image != undefined
                        ? media.cover_image[0].filepath + media.cover_image[0].filename
                        : currentData.cover_image;
        const data = {
            _id: blog_id,
            cover_image: cover_image,
            blog_info: {
                name: content.name,
                description:content.description
            },
        }
        let bloginfodata = []
        bloginfodata = await sportsinfo.findByIdAndUpdate(blog_id, data, {new: true})
        
        res.status(201).send({
            success: true,
            data: bloginfodata,
            message: 'blog-info updated successfully',
        })
    }
    catch (err) {
        res.status(401).send({
            success: false,
            message: 'blog-info.controller: ' + err.message
        });
    }
}

export const getBlogInfoAll = async (req, res) => {
    try {
        const data = await sportsinfo.find().select([
            'cover_image',
            'blog_info.name',
            'blog_info.description',
            'user'
        ]);
        if (data <= 0) {
            res.status(401).send({
                success: false,
                message: 'blog-info data not found'
            })
        }
        else {
            res.status(200).send({
                success: true,
                data: data,
                length: data.length,
                message: 'blog-info data fetched successfully'
            })
        }
    }
    catch (err) {
        res.status(401).send({
            success: false,
            message: 'blog-info.controller: ' + err.message
        })
    }
}


export const getbloginfobyid = async (req, res) => {
    try {
        const blog_id = req.query.bid

        const data = await sportsinfo.findById(blog_id);
        if (data <= 0) {
            res.status(401).send({
                success: false,
                message: 'blog-info data not found'
            })
        }
        else {
            res.status(201).send({
                success: true,
                data: data,
                length: data.length,
                message: 'blog-info data fetched successfully'
            })
        }
    }
    catch (err) {
        res.status(401).send({
            success: false,
            message: 'blog-info.controller: ' + err.message
        })
    }
}


export const deleteBlogInfo = async (req, res) => {
    try {
        const blog_id = req.query.bid
        const bloginfoData = await sportsinfo.findByIdAndDelete(blog_id)

        res.status(201).send({
            success: true,
            data: bloginfoData,
            message: 'blog deleted successfully',
        })
    }
    catch (err) {
        res.status(401).send({
            success: false,
            message: 'blog-info.controller: ' + err.message
        });
    }
}


// Travel Info Apis


export const inserttravelinfo = async (req, res) => {
    try {

        const content = req.body
        const media = req.files

        const data = new sportsinfo({
            cover_image_travel: media.cover_image_travel != undefined ? media.cover_image_travel[0].filepath + media.cover_image_travel[0].filename : '',
            travel_info: {
                name: content.name,
                description:content.description
            },
            user:content.user
            
        })      
        const sportsinfoData = await sportsinfo.create(data)
        res.status(201).send({
            success: true,
            data: sportsinfoData,
            message: 'Travel-info inserted successfully',
        })
    }
    catch (err) {
        res.status(401).send({
            success: false,
            message: 'Travel-info.controller: ' + err.message
        });
    }
}


export const updateTravelInfo = async (req, res) => {
    console.log("=================== called")
    try {
        const travel_id = req.query.travel_id
        const content = req.body
        const media = req.files

        const currentData = await sportsinfo.findById(travel_id).lean().exec();
        let cover_image_travel;
        cover_image_travel = media.cover_image_travel != undefined
                        ? media.cover_image_travel[0].filepath + media.cover_image_travel[0].filename
                        : currentData.cover_image_travel;
        const data = {
            _id: travel_id,
            cover_image_travel: cover_image_travel,
            travel_info: {
                name: content.name,
                description:content.description
            },
        }
        let travelinfodata = []
        travelinfodata = await sportsinfo.findByIdAndUpdate(travel_id, data, {new: true})
        
        res.status(201).send({
            success: true,
            data: travelinfodata,
            message: 'Travel-info updated successfully',
        })
    }
    catch (err) {
        res.status(401).send({
            success: false,
            message: 'Travel-info.controller: ' + err.message
        });
    }
}

export const getTravelInfoAll = async (req, res) => {
    try {
        const data = await sportsinfo.find().select([
            'cover_image_travel',
            'travel_info.name',
            'travel_info.description',
            'user'
        ]);
        const result = data.filter(s => s);
        console.log("===========",result)

        // if (result <= 0) {
        //     res.status(401).send({
        //         success: false,
        //         message: 'Travel-info data not found'
        //     })
        // }
        // else {
        //     res.status(200).send({
        //         success: true,
        //         data: result,
        //         length: result.length,
        //         message: 'Travel-info data fetched successfully'
        //     })
        // }
    }
    catch (err) {
        res.status(401).send({
            success: false,
            message: 'Travel-info.controller: ' + err.message
        })
    }
}


export const getTravelinfobyid = async (req, res) => {
    try {
        const travel_id = req.query.bid

        const data = await sportsinfo.findById(travel_id);
        if (data <= 0) {
            res.status(401).send({
                success: false,
                message: 'Travel-info data not found'
            })
        }
        else {
            res.status(201).send({
                success: true,
                data: data,
                length: data.length,
                message: 'Travel-info data fetched successfully'
            })
        }
    }
    catch (err) {
        res.status(401).send({
            success: false,
            message: 'Travel-info.controller: ' + err.message
        })
    }
}


export const deleteTravelInfo = async (req, res) => {
    try {
        const travel_id = req.query.bid
        const travelinfodata = await sportsinfo.findByIdAndDelete(travel_id)

        res.status(201).send({
            success: true,
            data: travelinfodata,
            message: 'Travel-info deleted successfully',
        })
    }
    catch (err) {
        res.status(401).send({
            success: false,
            message: 'Travel-info.controller: ' + err.message
        });
    }
}
