import { Router } from "express";
import { BlogController } from "../../controllers/blog.controller";
import { authorizedMiddleware , adminOnlyMiddleware } from "../../middlewares/authorization.middleware";

const router = Router();
const blogController = new BlogController();

//apply middleware to all routes
router.use(authorizedMiddleware);
router.use(adminOnlyMiddleware);    

router.get("/", blogController.getAllBlogs);

export default router;