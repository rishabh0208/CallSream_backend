import mongoose from "mongoose";
import users from "../models/auth.js";

export const updateChannelData = async (req, res) => {
  const { id: _id } = req.params;
  const { name, desc } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Channel Unavailable...");
  }

  try {
    const updateData = await users.findByIdAndUpdate(
      _id,
      {
        $set: {
          'name': name,
          'desc': desc,
        },
      },
      { new: true }
    );
       // console.log(updateData)
    res.status(200).json(updateData);
  } catch (error) {
    console.log(error);
    res.status(405).json({ message: error.message });
  }
};

export const getAllChannels = async (req, res) => {
    
  try {
    const allchannels = await users.find();
    const allChannelDetails = [];
    allchannels.forEach((channel) => {
      allChannelDetails.push({
        _id: channel._id,
        name: channel.name,
        email: channel.email,
        desc: channel.desc,
      });
        
    });
    //console.log(allChannelDetails);
    res.status(200).json(allChannelDetails);
  } catch (error) {
    //console.log(error);
    res.status(404).json({message: error.message});
  }
};
