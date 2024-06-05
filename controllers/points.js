import User from '../models/auth.js'
import mongoose from "mongoose"

export const pointsController= async(req,res)=>{
    const {id} = req.body;
     // console.log(_id,view);
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send("Video Unavailable...");
      }

      try {
       const user= await User.findById(id);
       user.points += 5;
        await user.save();
        res.status(200).json("points updated");
      } catch (error) {
        res.status(400).json(error) 
      }

}