import { sportsinfo } from "./sports-info.model.js"


// insert blog-info
export const insertjobinfo = async (req, res) => {
    try {

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