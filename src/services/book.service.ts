import { IBookRepository, BookRepository } from "../repositories/book.repository";
import { Book } from "../types/book.types";

let bookRepository: IBookRepository = new BookRepository();

export class BookService{
    getAllBooks = () => {
        let response = bookRepository
        .getAllBooks().
        map((book) => {
            return {...book, title:book.title.toUpperCase() }
        });    
        return response;
    };
    createBook = (book: Book) => {
        const exist = bookRepository.getOneBook(book.id);
        if(exist){
            throw new Error("Book with this ID already exists");
        }
        //more logic/query/processing can be added here
        return bookRepository.createBook(book);
    }
}