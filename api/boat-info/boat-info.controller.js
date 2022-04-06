import { BoatInfo } from "./boat-info.model.js"
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { response } from "express";

// get all boat-info data
export const getBoatInfoAll = async (req, res) => {
    try {
        const data = await BoatInfo.find();
        if (data <= 0) {
            res.status(401).send({
                success: false,
                message: 'boat-info data not found'
            })
        }
        else {
            res.status(200).send({
                success: true,
                data: data,
                length: data.length,
                message: 'boat-info data fetched successfully'
            })
        }
    }
    catch (err) {
        res.status(401).send({
            success: false,
            message: 'boat-info.controller: ' + err.message
        })
    }
}

// get boat-info data by id
export const getBoatInfoById = async (req, res) => {
    try {
        const boat_id = req.query.bid

        const data = await BoatInfo.findById(boat_id);
        if (data <= 0) {
            res.status(401).send({
                success: false,
                message: 'boat-info data not found'
            })
        }
        else {
            res.status(201).send({
                success: true,
                data: data,
                length: data.length,
                message: 'boat-info data fetched successfully'
            })
        }
    }
    catch (err) {
        res.status(401).send({
            success: false,
            message: 'boat-info.controller: ' + err.message
        })
    }
}

// insert boat-info page data
export const insertBoatInfo = async (req, res) => {
    try {
        // const { userId } = req.body;
        // const { company, position, city, description, fromdate, todate } = req.body
        // var data = content;
        // const home = new Home(data);
        // home.save()

        const content = req.body
        const media = req.files

        const data = new BoatInfo({
            cover_image: media.cover_image != undefined ? media.cover_image[0].filename : '',
            boat_type: content.boat_type,
            boat_info: {
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
            }
        })

        for(let i = 0; i < media.boat_images.length; i++) {
            data.boat_images.push({name: media.boat_images[i].filename})
        }

        // checkUserData(userId);
        const boatInfoData = await BoatInfo.create(data)
        // addData(userId, data, "work");

        res.status(201).send({
            success: true,
            data: boatInfoData,
            message: 'boat-info inserted successfully',
        })
    }
    catch (err) {
        res.status(401).send({
            success: false,
            message: 'boat-info.controller: ' + err.message
        });
    }
}

// update boat-info page data
export const updateBoatInfo = async (req, res) => {
    try {
        // const { userId } = req.body;
        // const { company, position, city, description, fromdate, todate } = req.body
        // var data = content;
        // const home = new Home(data);
        // home.save()
        const boat_id = req.query.bid
        const content = req.body
        const media = req.files

        const data = {
            _id: boat_id,
            cover_image: media.cover_image != undefined ? media.cover_image[0].filename : '',
            boat_type: content.boat_type,
            boat_info: {
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
            }
        }

        for(let i=0; i<req.files.boat_images; i++) {
            data.boat_images.push({name: req.files.images[i].filename})
        }

        // checkUserData(userId);
        const boatInfoData = await BoatInfo.findByIdAndUpdate(boat_id, data, {new: true})
        // addData(userId, data, "work");

        res.status(201).send({
            success: true,
            data: boatInfoData,
            message: 'boat-info updated successfully',
        })
    }
    catch (err) {
        res.status(401).send({
            success: false,
            message: 'boat-info.controller: ' + err.message
        });
    }
}