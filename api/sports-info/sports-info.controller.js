import { sportsinfo } from "./sports-info.model.js"
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { response } from "express";
// insert sports-info
export const insertsportsinfo = async (req, res) => {
    try {

        const content = req.body
        const media = req.files

        const data = new sportsinfo({
            cover_image: media.cover_image != undefined ? media.cover_image[0].filepath + media.cover_image[0].filename : '',
            blog_info: {
                name: content.name,
                description:content.description
            },
            
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
            message: 'boat-info.controller: ' + err.message
        });
    }
}