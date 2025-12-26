import { CreateUserDto } from "../dtos/user.dto";
import { UserServices } from "../services/user.service";
import z, { success } from "zod";
import { Request, Response } from "express";

let userServices = new UserServices();

export class AuthController{
    async register(req: Request, res: Response){
        try{
            const parsedData = CreateUserDto.safeParse(req.body);
            if(!parsedData.success){
                return res.status(400).json(
                    {success: false, message: z.prettifyError(parsedData.error)}
                ); //z.prettifyError - better error message (zod)
            }
            const newUser = await userServices.registerUser(parsedData.data);
            return res.status(201).json(
                {success: true, data: newUser, message: "Register Success"}
            );
        }catch (error: Error | any){
            return res.status(error.statusCode || 500).json(
                {success: false, data: error.message || "Internal Server Error"}
            );
        }
    }
}