import { home } from "./home.model.js"



// Home Info apis

export const inserthomeinfo = async (req, res) => {
    try {

        const content = req.body
        const media = req.files

        const data = new home({
            cover_image: media.cover_image != undefined ? media.cover_image[0].filepath + media.cover_image[0].filename : '',
            blog_info: {
                name: content.name,
                description: content.description
            },
            user: content.user

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


export const updatehomeInfo = async (req, res) => {
    console.log("=================== called")
    try {
        const blog_id = req.query.blog_id
        const content = req.body
        const media = req.files

        const currentData = await sportsinfo.findById(blog_id).lean().exec();
        let cover_image;
        cover_image = media.cover_image != undefined
            ? media.cover_image[0].filepath + media.cover_image[0].filename
            : currentData.cover_image;
        const data = {
            _id: blog_id,
            cover_image: cover_image,
            blog_info: {
                name: content.name,
                description: content.description
            },
        }
        let bloginfodata = []
        bloginfodata = await sportsinfo.findByIdAndUpdate(blog_id, data, { new: true })

        res.status(201).send({
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

export const gethomeInfoAll = async (req, res) => {
    try {
        const data = await sportsinfo.find().select([
            'cover_image',
            'blog_info.name',
            'blog_info.description',
            'user'
        ]);
        if (data <= 0) {
            res.status(401).send({
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


export const gethomeinfobyid = async (req, res) => {
    try {
        const blog_id = req.query.bid

        const data = await sportsinfo.findById(blog_id);
        if (data <= 0) {
            res.status(401).send({
                success: false,
                message: 'blog-info data not found'
            })
        }
        else {
            res.status(201).send({
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


export const deletehomeInfo = async (req, res) => {
    try {
        const blog_id = req.query.bid
        const bloginfoData = await sportsinfo.findByIdAndDelete(blog_id)
        res.status(201).send({
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


