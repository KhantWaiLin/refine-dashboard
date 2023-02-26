import User from '../mongodb/models/user.js';
import Property from '../mongodb/models/property.js';
import mongoose from 'mongoose';

import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRETE,
});

const getAllProperties = async (req, res) => {
    const {
        _end,
        _order,
        _start,
        _sort,
        title_like = "",
        propertyType = ""
    } = req.query;

    const query = {};
    if (propertyType !== "") {
        query.propertyType = propertyType;
    }

    if (title_like) {
        query.title = { $regex: title_like, $options: "i" }
    }

    try {
        const count = await Property.countDocuments({ query });
        const allproperties = await Property.find(query)
            .limit(_end)
            .skip(_start)
            .sort({ [_sort]: _order });
        res.header('x-total-count', count);
        res.header('Access-Control-Expose-Headers', 'x-total-count')
        res.status(200).json(allproperties);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

const getPropertyDetail = async (req, res) => {
    const { id } = req.params;

    try {
        const property = await Property.findById(id).populate('creator');
        res.status(200).json(property);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}
const createProperty = async (req, res) => {
    try {
        const {
            title,
            description,
            propertyType,
            location,
            price,
            photo,
            email,
        } = req.body;

        //Start a new Session
        const session = await mongoose.startSession();
        session.startTransaction();

        const user = await User.findOne({ email }).session(session);

        if (!user) throw new Error("User not found!");

        const photoUrl = await cloudinary.uploader.upload(photo);

        console.log(photoUrl.url);

        const newProperty = await Property.create({
            title,
            description,
            propertyType,
            location,
            price,
            photo: photoUrl.url,
            creator: user._id,
        });

        user.allProperties.push(newProperty._id);
        await user.save({ session });

        await session.commitTransaction();

        res.status(200).json({ message: "Propety Created Successfully!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const updateProperty = async (req, res) => {

    try {
        const { id } = req.params;
        const {
            title,
            description,
            price,
            location,
            photo,
            propertyType,
            creator
        } = req.body;

        const photoUrl = await cloudinary.uploader.upload(photo);

        await Property.findByIdAndUpdate({ _id: id }, {
            title,
            description,
            price,
            location,
            photo: photoUrl.url || photo,
            creator,
            propertyType
        });

        res.status(200).json({ message: "Updated Successfully!!" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const deleteProperty = async (req, res) => {
    try {
        const { id } = req.params;

        const propertyToDelete = await Property.findById({ _id: id }).populate('creator');

        if (!propertyToDelete) throw Error('Property not found');

        const session = await mongoose.startSession();
        session.startTransaction();

        propertyToDelete.remove({ session });
        propertyToDelete.creator.allProperties.pull(propertyToDelete);

        await propertyToDelete.creator.save({ session });
        await session.commitTransaction();

        res.status(200).json({ message: "Property Deleted Successfully!!!" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export {
    getAllProperties,
    getPropertyDetail,
    createProperty,
    updateProperty,
    deleteProperty
};