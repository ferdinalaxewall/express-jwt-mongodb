import express from "express";
import { createPost, deletePostById, getAllPost, getPostById, updatePostById } from "../controller/PostController.js";
import { refreshToken } from "../controller/RefreshTokenController.js";
import { Login, Logout, Register } from "../controller/UserController.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { LoginValidation } from "../validation/LoginValidation.js";
import { RegisterValidation } from "../validation/RegisterValidation.js";
import { StorePostValidation } from "../validation/StorePostValidation.js";
import { UpdatePostValidation } from "../validation/UpdatePostValidation.js";

const router = express.Router();

router.get('/', async (req,res) => {
    return res.status(200).json({
        message: "Hello, I'am Ferdinalaxewall!"
    })
})

router.get('/posts', verifyToken, getAllPost);
router.post('/post', verifyToken, StorePostValidation, createPost);
router.get('/post/:id', verifyToken, getPostById);
router.patch('/post/:id', verifyToken, UpdatePostValidation, updatePostById);
router.delete('/post/:id', verifyToken, deletePostById);

router.post('/register', RegisterValidation, Register);
router.post('/login', LoginValidation, Login);
router.delete('/logout', Logout);
router.get('/refresh-token', refreshToken);

export default router;