import { sportsinfo } from "./sports-info.model.js"
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { response } from "express";
// insert blog-info
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