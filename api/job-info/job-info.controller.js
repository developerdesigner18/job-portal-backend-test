import { jobInfo } from "./job-info.model.js"
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { response } from "express";

// get all job-info data
export const getjobInfoAll = async (req, res) => {
    try {
        const data = await jobInfo.find().select([
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
            res.status(401).send({
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
export const getActivejobInfoAll = async (req, res) => {
    try {
        const data = await jobInfo.find({status: 'active'}).select([
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
            res.status(401).send({
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

export const getjobInfoAllByType = async (req, res) => {
    var btype = decodeURIComponent(req.query?.btype)
    try {
        const data = await jobInfo.find({job_type: btype, status: 'active'}).select([
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
            res.status(401).send({
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
export const getjobInfoById = async (req, res) => {
    try {
        const job_id = req.query.bid

        const data = await jobInfo.findById(job_id);
        if (data <= 0) {
            res.status(401).send({
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
export const insertjobInfo = async (req, res) => {
    try {
        // const { userId } = req.body;
        // const { company, position, city, description, fromdate, todate } = req.body
        // var data = content;
        // const home = new Home(data);
        // home.save()

        const content = req.body
        const media = req.files

        const data = new jobInfo({
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
        const jobInfoData = await jobInfo.create(data)
        // addData(userId, data, "work");

        res.status(201).send({
            success: true,
            data: jobInfoData,
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
export const updatejobInfo = async (req, res) => {
    try {
        // const { userId } = req.body;
        // const { company, position, city, description, fromdate, todate } = req.body
        // var data = content;
        // const home = new Home(data);
        // home.save()
        const job_id = req.query.bid
        const content = req.body
        const media = req.files

        const currentData = await jobInfo.findById(job_id).lean().exec();

        const data = {
            _id: job_id,
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
            status: currentData.status
        }

        for(let i=0; i<media.job_images; i++) {
            data.job_images.push({name: media.images[i].filepath + media.images[i].filename})
        }

        // checkUserData(userId);
        const jobInfoData = await jobInfo.findByIdAndUpdate(job_id, data, {new: true})
        // addData(userId, data, "work");

        res.status(201).send({
            success: true,
            data: jobInfoData,
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
        const jobInfoData = await jobInfo.findByIdAndUpdate(job_id, {$set : {status: status}}, {new: true})
        // addData(userId, data, "work");

        res.status(201).send({
            success: true,
            data: jobInfoData,
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

export const deletejobInfo = async (req, res) => {
    try {
        const job_id = req.query.bid
        // checkUserData(userId);
        const jobInfoData = await jobInfo.findByIdAndDelete(job_id)
        // addData(userId, data, "work");

        res.status(201).send({
            success: true,
            data: jobInfoData,
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