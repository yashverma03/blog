import express from 'express';
import { createPost, updatePost, deletePost, getPost, getAllPosts } from '../controller/postController.js';
import { uploadImage, getImage } from '../controller/imageController.js';
import { newComment, getComments, deleteComment } from '../controller/commentController.js';
import { loginUser, signupUser, logoutUser } from '../controller/userController.js';
import { authenticateToken, createNewToken } from '../controller/tokenController.js';
import upload from '../controller/fileUpload.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/signup', signupUser);
router.post('/logout', logoutUser);

router.post('/token', createNewToken);

router.post('/create', authenticateToken, createPost);
router.put('/update/:id', authenticateToken, updatePost);
router.delete('/delete/:id', authenticateToken, deletePost);

router.get('/post/:id', authenticateToken, getPost);
router.get('/posts', getAllPosts);

router.post('/file/upload', upload.single('file'), uploadImage);
router.get('/file/:filename', getImage);

router.post('/comment/new', authenticateToken, newComment);
router.get('/comments/:id', authenticateToken, getComments);
router.delete('/comment/delete/:id', authenticateToken, deleteComment);

export default router;
