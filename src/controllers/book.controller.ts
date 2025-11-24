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
        const validation = CreateBookDTO.safeParse(req.body);
        if(!validation.success){
            return res.status(400).json({errors: validation.error});
        }
        const {id, title} = validation.data;  // same as req.body bubt validated
        
        const newBook: Book = bookService.createBook({id, title});
        
        return res.status(201).json(newBook);

    }
    getBooks = (req: Request, res: Response) => {
    res.status(200).json(books);
    }
}