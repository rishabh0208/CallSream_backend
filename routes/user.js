import express from "express";
import {updateChannelData, getAllChannels} from "../controllers/channel.js";
import {login} from "../controllers/auth.js";
const routes = express.Router();

routes.post('/login',login)
routes.patch('/update/:id',updateChannelData)
routes.get('/getAllChannels',getAllChannels)

export default routes;