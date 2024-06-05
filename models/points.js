import mongoose from "mongoose";

const PointsSchema= mongoose.Schema({
    points: { type: Number, default: 0 },
})

export default mongoose.model("Points", PointsSchema)