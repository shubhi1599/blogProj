import express from 'express';
import { addBlogs, 
        deleteBlog, 
        getAllBlogs, 
        getBlogByUserId, 
        getById, 
        updateBlogs 
    } from '../controller/blog-controller';

const blogRouter = express.Router();

blogRouter.get('/',getAllBlogs);
blogRouter.post('/addblog',addBlogs);
blogRouter.put('/update/:id',updateBlogs);
blogRouter.get('/:id',getById);
blogRouter.delete('/:id',deleteBlog);
blogRouter.get('/user/:id',getBlogByUserId);

export default blogRouter;