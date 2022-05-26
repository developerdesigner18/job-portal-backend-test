import { jobinfo } from "./job-info.model.js"
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { response } from "express";

// get all job-info data
export const getjobinfoAll = async (req, res) => {
    try {
        const data = await jobinfo.find().select([
            'cover_image',
            'job_type',
            'job_info.name',
            'job_info.width',
            'job_info.manufacturer',
            'job_info.mfg_year',
            'job_info.mfg_year',
            'status'
        ]);
        if (data <= 0) {
            res.status(200).send({
                success: false,
                message: 'job-info data not found'
            })
        }
        else {
            res.status(200).send({
                success: true,
                data: data,
                length: data.length,
                message: 'job-info data fetched successfully'
            })
        }
    }
    catch (err) {
        res.status(401).send({
            success: false,
            message: 'job-info.controller: ' + err.message
        })
    }
}

// get active job-info data
export const getActivejobinfoAll = async (req, res) => {
    try {
        const data = await jobinfo.find({status: 'active'}).select([
            'cover_image',
            'job_type',
            'job_info.name',
            'job_info.width',
            'job_info.manufacturer',
            'job_info.mfg_year',
            'job_info.mfg_year',
            'status'
        ]);
        if (data <= 0) {
            res.status(200).send({
                success: false,
                message: 'job-info data not found'
            })
        }
        else {
            res.status(200).send({
                success: true,
                data: data,
                length: data.length,
                message: 'job-info data fetched successfully'
            })
        }
    }
    catch (err) {
        res.status(401).send({
            success: false,
            message: 'job-info.controller: ' + err.message
        })
    }
}

export const getjobinfoAllByType = async (req, res) => {
    var btype = decodeURIComponent(req.query?.btype)
    try {
        const data = await jobinfo.find({job_type: btype, status: 'active'}).select([
            'cover_image',
            'job_type',
            'job_info.name',
            'job_info.width',
            'job_info.manufacturer',
            'job_info.mfg_year',
            'job_info.mfg_year',
            'status'
        ]);
        if (data <= 0) {
            res.status(200).send({
                success: false,
                message: 'job-info data not found'
            })
        }
        else {
            res.status(200).send({
                success: true,
                data: data,
                length: data.length,
                message: 'job-info data fetched successfully'
            })
        }
    }
    catch (err) {
        res.status(401).send({
            success: false,
            message: 'job-info.controller: ' + err.message
        })
    }
}

// get job-info data by id
export const getjobinfoById = async (req, res) => {
    try {
        const job_id = req.query.bid

        const data = await jobinfo.findById(job_id);
        if (data <= 0) {
            res.status(200).send({
                success: false,
                message: 'job-info data not found'
            })
        }
        else {
            res.status(201).send({
                success: true,
                data: data,
                length: data.length,
                message: 'job-info data fetched successfully'
            })
        }
    }
    catch (err) {
        res.status(401).send({
            success: false,
            message: 'job-info.controller: ' + err.message
        })
    }
}

// insert job-info page data
export const insertjobinfo = async (req, res) => {
    try {
        // const { userId } = req.body;
        // const { company, position, city, description, fromdate, todate } = req.body
        // var data = content;
        // const home = new Home(data);
        // home.save()

        const content = req.body
        const media = req.files

        const data = new jobinfo({
            cover_image: media.cover_image != undefined ? media.cover_image[0].filepath + media.cover_image[0].filename : '',
            job_type: content.job_type,
            job_info: {
                name: content.name,
                width: content.width,
                mfg_year: content.mfg_year,
                manufacturer: content.manufacturer,
                guest_capacity: content.guest_capacity,
                crew_capacity: content.crew_capacity,
                engine_type: content.engine_type,
                top_speed: content.top_speed,
                interior: content.interior,
                exterior: content.exterior,
                price: content.price,
            },
            status: 'active'
        })

        
        for(let i = 0; i < media.job_images.length; i++) {
            data.job_images.push({name: media.job_images[i].filepath + media.job_images[i].filename})
        }
        
        // checkUserData(userId);
        const jobinfoData = await jobinfo.create(data)
        // addData(userId, data, "work");

        res.status(201).send({
            success: true,
            data: jobinfoData,
            message: 'job-info inserted successfully',
        })
    }
    catch (err) {
        res.status(401).send({
            success: false,
            message: 'job-info.controller: ' + err.message
        });
    }
}

// update job-info page data
export const updatejobinfo = async (req, res) => {
    try {
        // const { userId } = req.body;
        // const { company, position, city, description, fromdate, todate } = req.body
        // var data = content;
        // const home = new Home(data);
        // home.save()
        const job_id = req.query.bid
        const content = req.body
        const media = req.files

        const currentData = await jobinfo.findById(job_id).lean().exec();
        let cover_image;
        cover_image = media.cover_image != undefined
                        ? media.cover_image[0].filepath + media.cover_image[0].filename
                        : currentData.cover_image;
        const data = {
            _id: job_id,
            cover_image: cover_image,
            job_type: content.job_type,
            job_info: {
                name: content.name,
                width: content.width,
                mfg_year: content.mfg_year,
                manufacturer: content.manufacturer,
                guest_capacity: content.guest_capacity,
                crew_capacity: content.crew_capacity,
                engine_type: content.engine_type,
                top_speed: content.top_speed,
                interior: content.interior,
                exterior: content.exterior,
                price: content.price,
            },
            status: currentData.status
        }

        // data.job_images = []
        // console.log('media.job_images.length', media.job_images.length);
        // for(let i=0; i<media.job_images.length; i++) {
        //     console.log('################', media.job_images[i]);
        //     data.job_images.push({name: media.job_images[i].filepath + media.job_images[i].filename})
        // }
        // console.log('-=-=-=-==-=-', data.job_images);
        // checkUserData(userId);
        let jobinfoData;
        if (media?.job_images) {
            for(let i= 0; i< media.job_images.length;i++) {
                jobinfoData = await jobinfo.findByIdAndUpdate(job_id, {$push: {job_images: {"name": media.job_images[i].filepath + media.job_images[i].filename }}}, {new: true})
            }
        } else {
            jobinfoData = await jobinfo.findByIdAndUpdate(job_id, data, {new: true})
        }
        
        // addData(userId, data, "work");

        res.status(201).send({
            success: true,
            data: jobinfoData,
            message: 'job-info updated successfully',
        })
    }
    catch (err) {
        res.status(401).send({
            success: false,
            message: 'job-info.controller: ' + err.message
        });
    }
}

// update job status
export const changejobStatus = async (req, res) => {
    try {
        console.log(req.query);
        const job_id = req.query.bid
        const status = req.query.status
        // checkUserData(userId);
        const jobinfoData = await jobinfo.findByIdAndUpdate(job_id, {$set : {status: status}}, {new: true})
        // addData(userId, data, "work");

        res.status(201).send({
            success: true,
            data: jobinfoData,
            message: 'job status changed successfully',
        })
    }
    catch (err) {
        res.status(401).send({
            success: false,
            message: 'job-info.controller: ' + err.message
        });
    }
}

// delete single image from job
export const deletejobImage = async (req, res) => {
    try {
        const job_id = req.query.bid
        const image_id = req.query.iid
        // checkUserData(userId);
        const jobinfoData = await jobinfo.findByIdAndUpdate(job_id, {$pull : {job_images: {_id : image_id}}}, {new: true})
        // addData(userId, data, "work");

        res.status(201).send({
            success: true,
            data: jobinfoData,
            message: 'job image deleted successfully',
        })
    }
    catch (err) {
        res.status(401).send({
            success: false,
            message: 'job-info.controller: ' + err.message
        });
    }
}

// delete job info
export const deletejobinfo = async (req, res) => {
    try {
        const job_id = req.query.bid
        // checkUserData(userId);
        const jobinfoData = await jobinfo.findByIdAndDelete(job_id)
        // addData(userId, data, "work");

        res.status(201).send({
            success: true,
            data: jobinfoData,
            message: 'job deleted successfully',
        })
    }
    catch (err) {
        res.status(401).send({
            success: false,
            message: 'job-info.controller: ' + err.message
        });
    }
}