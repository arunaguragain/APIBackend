import { BlogController } from "../controllers/blog.controller";
import { Router } from "express";
import { authorizedMiddleware } from "../middlewares/authorization.middleware";

const router = Router();
const blogController = new BlogController();
router.post(
    "/", 
    authorizedMiddleware, 
    blogController.createBlog
);
router.get(
    "/",
    blogController.getAllBlogs
)
export default router;