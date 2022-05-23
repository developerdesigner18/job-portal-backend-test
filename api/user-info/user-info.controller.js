import { UserInfo } from './user-info.model.js';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

export const getuserinfoById = async (req, res) => {
    try {
        const user_id = req.query.uid

        const data = await UserInfo.findById(user_id);
        if (data <= 0) {
            res.status(401).send({
                success: false,
                message: 'user-info data not found'
            })
        }
        else {
            res.status(201).send({
                success: true,
                data: data,
                length: data.length,
                message: 'user-info data fetched successfully'
            })
        }
    }
    catch (err) {
        res.status(401).send({
            success: false,
            message: 'user-info.controller: ' + err.message
        })
    }
}