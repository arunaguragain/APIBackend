import { Router, Request, Response } from "express";
import { BookController } from "../controllers/book.controller";

const router: Router = Router();

const bookController = new BookController();

router.get('/', bookController.getBooks);

// router.get('/bookid', bookController.getBookById)

export default router;