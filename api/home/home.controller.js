// Home Info Apis start


export const inserthomeinfo = async (req, res) => {
    try {

        const content = req.body
        const media = req.files

        const data = new sportsinfo({
            cover_image_travel: media.cover_image_travel != undefined ? media.cover_image_travel[0].filepath + media.cover_image_travel[0].filename : '',
            travel_info: {
                name: content.name,
                description: content.description,
                Url: content.Url,
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
        // if (currentData.rows[0].travel_images) {
        //     const banneruploadDir = paths.join(__dirname, "..", "..", "public", "sports-info");
        //     console.log('banneruploadDir', `${banneruploadDir}/${currentData.rows[0].travel_images}`);
            
        //     if(fs.existsSync(`${banneruploadDir}/${currentData.rows[0].travel_images}`)) {
        //         fs.unlink(`${banneruploadDir}/${currentData.rows[0].travel_images}`, (err => {
        //             if (err) console.log(err)
        //             else console.log("\nDeleted File");
        //         }))
        //     }
        // }
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
                Url:content.Url,
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
            'travel_info.Url',
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