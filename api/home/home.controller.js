import { homeinfo } from "./home.model.js"
import path from 'path';
import fs from 'fs';
// Home Info Apis start
export const inserthomeinfo = async (req, res) => {
    try {
        const content = req.body
        const media = req.files
        console.log("media", media)
        // console.log("-=-==-=-content",content);
        const data = new homeinfo({
            title: content.title,
            rd3_zone:{
                title: content.rd3_zone_title,
                description: content.rd3_zone_description,
                job_portal: {
                    title: content.rd3_zone_job_portal_title,
                    description: content.rd3_zone_job_portal_description,
                },
                stadtmarketing: {
                    title: content.rd3_zone_stadtmarketing_title,
                    description: content.rd3_zone_stadtmarketing_description,
                },
                sportmarketing: {
                    title: content.rd3_zone_sportmarketing_title,
                    description: content.rd3_zone_sportmarketing_description,
                }
            },
            rd3_references: {
                question: content.rd3_references_question,
                name: content.rd3_references_name,
                rd3_image: media.rd3_references_rd3_image[0].filepath + media.rd3_references_rd3_image[0].filename,
                description: content.rd3_references_description,
                designation: content.rd3_references_designation
            }
        })

        for(let i = 0; i < media.home_images.length; i++) {
            console.log("=--==-=--=home_image_title", content.home_image_title[i]);
            data.home_images.push({name: media.home_images[i].filepath + media.home_images[i].filename, title: content.home_image_title[i]});
        }
        const homeData = await homeinfo.create(data)
        res.status(200).send({
            success: true,
            data: homeData,
            message: 'Home-info inserted successfully',
        })
    }
    catch (err) {
        res.status(401).send({
            success: false,
            message: 'Home-info.controller: ' + err.message
        });
    }
}
export const updatehomeInfo = async (req, res) => {
    try {
        const content = req.body
        const media = req.files
        let homeinfodata;
        homeinfodata = await homeinfo.findByIdAndUpdate(content.home_id, {$set: {
            title: content.title,
            rd3_zone:{
                title: content.rd3_zone_title,
                description: content.rd3_zone_description,
                job_portal: {
                    title: content.rd3_zone_job_portal_title,
                    description: content.rd3_zone_job_portal_description,
                },
                stadtmarketing: {
                    title: content.rd3_zone_stadtmarketing_title,
                    description: content.rd3_zone_stadtmarketing_description,
                },
                sportmarketing: {
                    title: content.rd3_zone_sportmarketing_title,
                    description: content.rd3_zone_sportmarketing_description,
                }
            },
            rd3_references: {
                question: content.rd3_references_question,
                name: content.rd3_references_name,
                rd3_image: media.rd3_references_rd3_image[0].filepath + media.rd3_references_rd3_image[0].filename,
                description: content.rd3_references_description,
                designation: content.rd3_references_designation
            },
            home_images: [] 
        }}, {new: true})
        if (media?.home_images) {
            for(let i= 0; i< media.home_images.length;i++) {
                homeinfodata = await homeinfo.findByIdAndUpdate(content.home_id, {$push: {home_images: {"name": media.home_images[i].filepath + media.home_images[i].filename }}}, {new: true})
            }
        }
        res.status(200).send({
            success: true,
            data: homeinfodata,
            message: 'Home-info updated successfully',
        })
    }
    catch (err) {
        res.status(401).send({
            success: false,
            message: 'Home-info.controller: ' + err.message
        });
    }
}
export const deletehomeInfo = async (req, res) => {
    try {
        const home_id = req.query.home_id
        const homeInfoImgData = await homeinfo.findById(home_id).lean().exec();
        const homeinfodata = await homeinfo.findByIdAndDelete(home_id)

        if(homeInfoImgData.home_images){

            for(let i = 0;i<homeInfoImgData.home_images.length;i++){
                
                const __dirname = path.resolve();
                const banneruploadDir = path.join(__dirname, "public");

                if(fs.existsSync(`${banneruploadDir}/${homeInfoImgData.home_images[i].name}`)) {
                    fs.unlink(`${banneruploadDir}/${homeInfoImgData.home_images[i].name}`, (err => {
                        if (err){ 
                            console.log(err)
                        }else {
                            console.log('home-info deleted image successfully');
                        };
                    }))
                }
            }
        }
        if(homeinfodata){
            res.status(200).send({
                success: true,
                message: 'home-info deleted successfully',
            })
        }
    }
    catch (err) {
        res.status(401).send({
            success: false,
            message: 'home-info.controller: ' + err.message
        });
    }
}
export const deletehomeImage = async (req, res) => {
    try {
        const home_id = req.query.home_id
        const image_id = req.query.image_id
        const homeInfoData = await homeinfo.findById(home_id)
        const homeInfoUpdateData = await homeinfo.findByIdAndUpdate(home_id, {$pull : {home_images: {_id : image_id}}})
        if(homeInfoData){
            if (homeInfoData.home_images) {
                for(let i = 0;i<homeInfoData.home_images.length;i++){
                    const __dirname = path.resolve();
                    const banneruploadDir = path.join(__dirname, "public");
                    if(homeInfoData.home_images[i]._id.toString() == image_id){
                    
                        if(fs.existsSync(`${banneruploadDir}/${homeInfoData.home_images[i].name}`)) {
                            fs.unlink(`${banneruploadDir}/${homeInfoData.home_images[i].name}`, (err => {
                                if (err) console.log(err)
                                else{
                                    if(homeInfoUpdateData){
                                        res.status(201).send({
                                            success: true,
                                            data: homeInfoUpdateData,
                                            message: 'Home images deleted successfully',
                                        })
                                    }
                                }
                            }))
                        }
                    }
                }

            }
        }
    }
    catch (err) {
        res.status(401).send({
            success: false,
            message: 'Home-info.controller: ' + err.message
        });
    }
}
export const gethomeInfoAll = async (req, res) => {
    try {
        const data = await homeinfo.find()
        .lean()
        .exec();

        if (data <= 0) {
            res.status(200).send({
                success: false,
                message: 'home-info data not found'
            })
        }
        else {
            res.status(200).send({
                success: true,
                data: data,
                length: data.length,
                message: 'home-info data fetched successfully'
            })
        }
    }
    catch (err) {
        res.status(401).send({
            success: false,
            message: 'home-info.controller: ' + err.message
        })
    }
}
export const gethomeinfobyid = async (req, res) => {
    try {
        const data = await homeinfo.findById(req.query.home_id);
        if (data <= 0) {
            res.status(200).send({
                success: false,
                message: 'Home-info data not found'
            })
        }
        else {
            res.status(201).send({
                success: true,
                data: data,
                length: data.length,
                message: 'Home-info data fetched successfully'
            })
        }
    }
    catch (err) {
        res.status(401).send({
            success: false,
            message: 'Home-info.controller: ' + err.message
        })
    }
}
// Home Info Apis end