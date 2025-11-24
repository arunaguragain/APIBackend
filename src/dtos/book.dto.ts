import z from "zod";
import { BookSchema } from "../types/book.types";


// Dta Transfer Object - DTO
// How to process request and response data 
export const CreateBookDTO = BookSchema.pick({id: true, title: true});
export type CreateBookDTO = z.infer<typeof CreateBookDTO>;
