import express from "express";
import {updateChannelData, getAllChannels} from "../controllers/channel.js";
import {login} from "../controllers/auth.js";
import { pointsController } from "../controllers/points.js";
const routes = express.Router();

routes.post('/login',login)
routes.patch('/update/:id',updateChannelData)
routes.get('/getAllChannels',getAllChannels)

routes.post('/points', pointsController);

export default routes;