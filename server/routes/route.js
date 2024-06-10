import express from "express";
import {signupUser, loginUser} from '../controllers/user-controllers.js'
import {uploadImage} from '../controllers/image-controllers.js'
import upload from '../utils-middleware/upload.js'

const router = express.Router();


router.post('/signup', signupUser)
router.post('/login', loginUser)
router.post('/file/upload', upload.single('file'), uploadImage)

export default router