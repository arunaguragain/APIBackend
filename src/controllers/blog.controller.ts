import { BlogService } from "../services/blog.service";
import { Request, Response } from "express";
const blogService = new BlogService();

interface QueryParams {
    page?: string;
    size?: string;
    search?: string;
}
export class BlogController {
    async createBlog(req: Request, res: Response) {
        try{
            const userId = req.user?._id; // attached from middleware
            req.body.authorId = userId; // add userId into authorId
            // Implement DTO 

            const newBlog = await blogService.createBlog(req.body);
            return  res.status(201).json({
                success: true,
                data: newBlog,
                message: "Blog Created"
            })
        }catch(err: Error | any){
            return res.status(err.statusCode || 500).json({
                success: false,
                message: err.message || "Error"
            })
        }
    }

    async getAllBlogs(req: Request, res: Response) {
        try {
            const { page, size, search }: QueryParams = req.query;
            const { blogs, pagination } = await blogService.getAllBlogs({
                page: page,
                size: size,
                search: search
            });
            return res.status(200).json(
                { success: true, message: "Blogs fetched successfully", data: blogs, pagination: pagination }
            );
        }
        catch (error: Error | any) {
            return res.status(error.statusCode ?? 500).json(
                { success: false, message: error.message || "Internal Server Error" }
            );
        }
    }
}