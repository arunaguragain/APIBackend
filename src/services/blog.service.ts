import { BlogRepository } from "../repositories/blog.repository";

const blogRepo = new BlogRepository();
export class BlogService{
    async createBlog(blog: any){
        const newBlog = await blogRepo.create(blog);
        return newBlog;
    }

    async getAllBlogs({ page, size, search }: { page?: string | undefined, size?: string | undefined, search?: string | undefined }) {
        const currentPage = page ? parseInt(page) : 1;
        const currentSize = size ? parseInt(size) : 10;
        const currentSearch = search || "";
        const { blogs, totalBlogs } = await blogRepo
            .getAllBlogs({ page: currentPage, size: currentSize, search: currentSearch });
        const pagination = {
            page: currentPage,
            size: currentSize,
            total: totalBlogs,
            totalPages: Math.ceil(totalBlogs / currentSize),
        }
        return { blogs, pagination };
    }
}