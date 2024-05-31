import express from "express";
import {postComment,getComment,deleteComment,editComment} from "../controllers/comments.js"
import auth from '../middleware/auth.js'

const routes= express.Router(); 

routes.post('/post',auth,postComment);
routes.get('/get',getComment);
routes.patch("/edit/:id",auth,editComment);
routes.delete('/delete/:id',auth,deleteComment);


export default routes;