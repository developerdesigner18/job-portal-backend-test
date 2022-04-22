import express from "express";
import {
    getjobinfoAll,
    getActivejobinfoAll,
    getjobinfoAllByType,
    getjobinfoById,
    insertjobinfo,
    updatejobinfo,
    changejobStatus,
    deletejobImage,
    deletejobinfo
} from "./job-info.controller.js";
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import { jobinfo } from "./job-info.model.js"
import { checkJWT } from "../../middleware/check-jwt.js"

export const jobinfoRouter = express.Router();

var jobinfoStorage = multer.diskStorage({
    destination: async function (req, file, cb) {
        
        const __dirname = path.resolve(path.dirname(''));
        const jobinfoUploadDir = path.join(__dirname, '.', 'public', 'job-info');
        if (fs.existsSync(jobinfoUploadDir)) {
            cb(null, jobinfoUploadDir)
        }
        else {
            fs.mkdirSync(jobinfoUploadDir, { recursive: true })
            cb(null, jobinfoUploadDir)
        }
    },

    filename: async function (req, file, cb) {
        // const decoded = await jwt.verify(req.headers.token, configKey.secrets.JWT_SECRET);
            // const data = await jobinfo.findOne({ page: "Home" })
            const extension = file.originalname.substring(file.originalname.lastIndexOf('.'));
            cb(null, Math.random().toString(36).substring(2, 15) + "_" + Date.now() + extension)
    }
})

const uploadjobImages = multer({
    storage: jobinfoStorage,
    fileFilter: function (req, file, cb) {
        const fileType = /jpeg|jpg|png/;
        // const fileType = /jpeg|jpg|png|gif|mp4|avi/;
        const extension = file.originalname.substring(file.originalname.lastIndexOf('.') + 1);
        const mimetype = fileType.test(file.mimetype);
        file.filepath = '/job-info/'

        if (mimetype && extension) {
            return cb(null, true);
        } else {
            cb('Error: you can upload only jpeg|jpg|png image files');
        }
    }
})

jobinfoRouter.get("/getjobinfoAll", getjobinfoAll)
jobinfoRouter.get("/getActivejobinfoAll", getActivejobinfoAll)
jobinfoRouter.get("/getjobinfoAllByType", getjobinfoAllByType)
jobinfoRouter.get("/getjobinfoById", getjobinfoById)
jobinfoRouter.post("/insertjobinfo", checkJWT, uploadjobImages.fields([{name: 'cover_image', maxCount: 1}, {name: 'job_images', maxCount: 20}]), insertjobinfo)
jobinfoRouter.post("/updatejobinfo", checkJWT, uploadjobImages.fields([{name: 'cover_image', maxCount: 1}, {name: 'job_images', maxCount: 20}]), updatejobinfo)
jobinfoRouter.post("/changejobStatus", checkJWT, changejobStatus)
jobinfoRouter.delete("/deletejobImage", checkJWT, deletejobImage)
jobinfoRouter.delete("/deletejobinfo", checkJWT, deletejobinfo)