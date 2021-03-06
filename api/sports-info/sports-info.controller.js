import { sportsinfo } from "./sports-info.model.js"
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { response } from "express";
import fs from 'fs'
import * as path from 'path'


// Blog Info apis start

export const insertbloginfo = async (req, res) => {
    try {

        const content = req.body
        const media = req.files

        const data = new sportsinfo({
            cover_image_blog: media.cover_image_blog != undefined ? media.cover_image_blog[0].filepath + media.cover_image_blog[0].filename : '',
            blog_info: {
                name: content.name,
                description: content.description,
                fulltext:content.fulltext
            },
            user: content.user

        })
        // for(let i = 0; i < media.blog_images.length; i++) {
        //     data.blog_images.push({name: media.blog_images[i].filepath + media.blog_images[i].filename})
        // }

        const sportsinfoData = await sportsinfo.create(data)
        res.status(200).send({
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
    // console.log("=================== called")
    try {
        const blog_id = req.query.blog_id
        const content = req.body
        const media = req.files

        const currentData = await sportsinfo.findById(blog_id).lean().exec();
        let cover_image_blog;
        cover_image_blog = media.cover_image_blog != undefined
            ? media.cover_image_blog[0].filepath + media.cover_image_blog[0].filename
            : currentData.cover_image_blog;
        const data = {
            _id: blog_id,
            cover_image_blog: cover_image_blog,
            blog_info: {
                name: content.name,
                description: content.description,
                fulltext:content.fulltext
            },
        }

        let bloginfodata;
        bloginfodata = await sportsinfo.findByIdAndUpdate(blog_id, data, {new: true})
        // if (media?.blog_images) {
        //     for(let i= 0; i< media.blog_images.length;i++) {
        //         bloginfodata = await sportsinfo.findByIdAndUpdate(blog_id, {$push: {blog_images: {"name": media.blog_images[i].filepath + media.blog_images[i].filename }}}, {new: true})
        //     }
        // } 
        res.status(200).send({
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
            'cover_image_blog',
            'blog_info.name',
            'blog_info.description',
            'blog_info.fulltext',
            'user'
        ]);
        const result = data.filter(s => s.blog_info.name );
        if (result <= 0) {
            res.status(200).send({
                success: false,
                message: 'blog-info data not found'
            })
        }
        else {
            res.status(200).send({
                success: true,
                data: result,
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
        const blog_id = req.query.blog_id

        const data = await sportsinfo.findById(blog_id);
        if (data <= 0) {
            res.status(200).send({
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


export const deleteBlogInfo = async (req, res) => {
    try {
        const blog_id = req.query.blog_id
        const bloginfoData = await sportsinfo.findByIdAndDelete(blog_id)
        // const fs = require("fs")
        // const pathToFile = "/sports-info/"

        // fs.unlink(pathToFile, function (err) {
        //     if (err) {
        //         throw err
        //     } else {
        //         console.log("Successfully deleted the file.")
        //     }
        // })

        res.status(200).send({
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


export const deleteBlogImage = async (req, res) => {
    try {
        const blog_id = req.query.blog_id
        const image_id = req.query.image_id
        const bloginfodata = await sportsinfo.findByIdAndUpdate(blog_id, {$pull : {cover_image_blog: {_id : image_id}}}, {new: true})

        res.status(201).send({
            success: true,
            data: bloginfodata,
            message: 'Blog images deleted successfully',
        })
    }
    catch (err) {
        res.status(401).send({
            success: false,
            message: 'Blog-info.controller: ' + err.message
        });
    }
}

// Blog Info Apis End


// Travel Info Apis start


export const inserttravelinfo = async (req, res) => {
    try {

        const content = req.body
        const media = req.files

        const data = new sportsinfo({
            cover_image_travel: media.cover_image_travel != undefined ? media.cover_image_travel[0].filepath + media.cover_image_travel[0].filename : '',
            travel_info: {
                name: content.name,
                description: content.description,
                player_names: content.player_names,
                Url: content.Url,
                flag:content.flag
            },
            filteroptions:content.filteroptions,
            user: content.user

        })
        for(let i = 0; i < media.travel_images.length; i++) {
            data.travel_images.push({name: media.travel_images[i].filepath + media.travel_images[i].filename})
        }

        const sportsinfoData = await sportsinfo.create(data)

        res.status(200).send({
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
    // console.log("=================== called")
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
                description: content.description,
                player_names: content.player_names,
                Url:content.Url,
                flag:content.flag
            },
            filteroptions:content.filteroptions
        }
        let travelinfodata
        travelinfodata = await sportsinfo.findByIdAndUpdate(travel_id, data, {new: true})
        if (media?.travel_images) {
            for(let i= 0; i< media.travel_images.length;i++) {
                travelinfodata = await sportsinfo.findByIdAndUpdate(travel_id, {$push: {travel_images: {"name": media.travel_images[i].filepath + media.travel_images[i].filename }}}, {new: true})
            }
        }
        res.status(200).send({
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

export const deleteTravelInfo = async (req, res) => {
    try {
        const travel_id = req.query.travel_id
        const travelinfodata = await sportsinfo.findByIdAndDelete(travel_id)

        res.status(200).send({
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

export const deleteTravelImage = async (req, res) => {
    try {
        const travel_id = req.query.travel_id
        const image_id = req.query.iid
        const travelInfoData = await sportsinfo.findByIdAndUpdate(travel_id, {$pull : {travel_images: {_id : image_id}}}, {new: true})

        res.status(201).send({
            success: true,
            data: travelInfoData,
            message: 'Travel images deleted successfully',
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
            'travel_info.player_names',
            'travel_info.Url',
            'travel_info.flag',
            'filteroptions',
            'travel_images',
            'user'
        ]);
        const result = data.filter(s => s.travel_info.name  );
        if (result <= 0) {
            res.status(200).send({
                success: false,
                message: 'Travel-info data not found'
            })
        }
        else {
            res.status(200).send({
                success: true,
                data: result,
                length: result.length,
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


export const getTravelinfobyid = async (req, res) => {
    try {
        const travel_id = req.query.travel_id

        const data = await sportsinfo.findById(travel_id);
        if (data <= 0) {
            res.status(200).send({
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


export const getTravelInfoAllByType = async (req, res) => {
    var ttype = decodeURIComponent(req.query?.ttype)
    try {
        const data = await sportsinfo.find({filteroptions: ttype}).select([
            'cover_image_travel',
            'travel_images',
            'filteroptions',
            'travel_info.name',
            'travel_info.description',
            'travel_info.Url',
            'travel_info.flag',   
            'user'
        ]);
        if (data <= 0) {
            res.status(200).send({
                success: false,
                message: 'Travel-info data not found'
            })
        }
        else {
            res.status(200).send({
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


// Travel Info Apis end

