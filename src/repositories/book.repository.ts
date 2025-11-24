import { Book } from "../types/book.types";

const books: Book[] = [
    {id: "B-1", title: '1984', date: '2022-10-11'},
    {id: "B-2", title: 'To kill a Mockingbird'},
];

export interface IBookRepository {
    getAllBooks() : Book [];
    getOneBook(id : string) : Book | undefined;
    createBook(book: Book ): Book;
}

export class BookRepository implements IBookRepository {
    getAllBooks(): Book[] {
        return books;
    }
    getOneBook(id: string) : Book | undefined{
        return books.find(book => book.id === id);
    }
    createBook(book: Book) : Book {
        books.push(book);
        return book;
    }
}