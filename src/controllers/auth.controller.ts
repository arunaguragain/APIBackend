import { CreateUserDto, LoginUserDto, UpdateUserDto } from "../dtos/user.dto";
import { UserService } from "../services/user.service";
import { Request, Response } from "express";
import z from "zod";
let userService = new UserService();
export class AuthController {
    async register(req: Request, res: Response) {
        try {
            const parsedData = CreateUserDto.safeParse(req.body);
            if (!parsedData.success) {
                return res.status(400).json(
                    { success: false, message: z.prettifyError(parsedData.error) }
                ); // z.prettifyError - better error messages (zod)
            }
            const newUser = await userService.registerUser(parsedData.data);
            return res.status(201).json(
                { success: true, data: newUser, message: "Register success" }
            );
        } catch (error: Error | any) {
            return res.status(error.statusCode || 500).json(
                { success: false, message: error.message || "Internal Server Error" }
            );
        }
    }
    async login(req: Request, res: Response) {
        try {
            const parsedData = LoginUserDto.safeParse(req.body);
            if (!parsedData.success) {
                return res.status(400).json(
                    { success: false, message: z.prettifyError(parsedData.error) }
                );
            }
            const { token, existingUser } = await userService.loginUser(parsedData.data);
            return res.status(200).json(
                { success: true, data: existingUser, token, message: "Login success" }
            );
        } catch (error: Error | any) {
            return res.status(error.statusCode || 500).json(
                { success: false, message: error.message || "Internal Server Error" }
            );
        }
    }

    async getProfile(req: Request, res: Response) {
        try{
            const userId = req.user?._id;
            if(!userId){
                return res.status(400).json(
                    { success: false, message: "User Id Not found" }
                );
            }
            const user = await userService.getUserById(userId);
            return res.status(200).json(
                { success: true, data: user, message: "User profile fetched successfully" }
            );
        }catch(error: Error | any){
            return res.status(error.statusCode || 500).json(
                { success: false, message: error.message || "Internal Server Error" }
            );
        }
    }

    async updateProfile(req: Request, res: Response) {
        try{
            const userId = req.user?._id;
            if(!userId){
                return res.status(400).json(
                    { success: false, message: "User Id Not found" }
                );
            }
            const parsedData = UpdateUserDto.safeParse(req.body);
            if (!parsedData.success) {
                return res.status(400).json(
                    { success: false, message: z.prettifyError(parsedData.error) }
                ); // z.prettifyError - better error messages (zod)
            }
            if(req.file){
                parsedData.data.imageUrl = `/uploads/${req.file.filename}`;
            }
            const updatedUser = await userService.updateUser(userId, parsedData.data);
            return res.status(200).json(
                { success: true, data: updatedUser, message: "User profile updated successfully" }
            );
        }catch(error: Error | any){
            return res.status(error.statusCode || 500).json(
                { success: false, message: error.message || "Internal Server Error" }
            );
        }
    }

    async sendResetPasswordEmail(req: Request, res: Response) {
        try {
            const email = req.body.email;
            const user = await userService.sendResetPasswordEmail(email);
            return res.status(200).json(
                { success: true,
                    data: user,
                    message: "If the email is registered, a reset link has been sent." }
            );
        } catch (error: Error | any) {
            return res.status(error.statusCode ?? 500).json(
                { success: false, message: error.message || "Internal Server Error" }
            );
        }
    }
}