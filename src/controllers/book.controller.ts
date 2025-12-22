import { Request, Response } from "express";
import { CreateBookDTO } from "../dtos/book.dto";
import { Book } from "../types/book.types";
import { BookService } from "../services/book.service";

let bookService : BookService = new BookService();

// schema, more than type checking - runtime validation
// what defines the shape of data, what validated dat -> book


// export type Book = {
//     id: string;
//     title: string;
//     date?: string; //optional
// }
                                                              
export class BookController{
    createBook = (req: Request, res:Response) => {
        try{
            const validation = CreateBookDTO.safeParse(req.body);
        if(!validation.success){
            return res.status(400).json({errors: validation.error});
        }
        const {id, title} = validation.data;  // same as req.body bubt validated

        const newBook: Book = bookService.createBook({id, title});
        
        return res.status(201).json(newBook);

        }catch(error: Error | any){
            return res.status(400).json({message: error.message ?? "Something went wrong"});
        }
    }
    getBooks = (req: Request, res: Response) => {
        let response = bookService.getAllBooks();
        res.status(200).json(response);
    }
    getBookById = (req: Request , res: Response) => {
        const {bookid} = req.params;
        let response = bookService.getBookById(bookid);
        res.status(200).json(response);
    }
}