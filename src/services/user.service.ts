import { CreateUserDto, LoginUserDto, UpdateUserDto } from "../dtos/user.dto";
import { UserRepository } from "../repositories/user.repository";
import bcrypts from "bcryptjs";
import { HttpError } from "../errors/http-error";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import { email } from "zod";


let userRepository = new UserRepository();

export class UserServices{
    async registerUser(data: CreateUserDto){
        //Business logic, check duplicate username/email, hash
        const checkEmail = await userRepository.getUserByEmail(data.email);
        if(checkEmail){
            throw new HttpError(403, "Email already in use");
        }
        const checkUsername = await userRepository.getUserByUsername(data.username);
        if(checkUsername){
            throw new HttpError(403, "Username already in use");
        }
        // hash/encrypt password, to not store plain text password = security risk
        const hashedPassword = await bcrypts.hash(data.password, 10); //10 - complexity
        data.password = hashedPassword; //update the password with hased one
        const newUser = await userRepository.createUser(data);

        return newUser;
    }
    async loginUser(data: LoginUserDto){
        const existingUser = await userRepository.getUserByUsername(data.username);
        if(!existingUser){
            throw new HttpError(404, "User not found");
        }
        const isPasswordValid = await bcrypts.compare(data.password, existingUser.password); //compare plain text with hashed
        if(!isPasswordValid){
            throw new HttpError(401, "Invalid credentials");
        }
        //generate JWT
        const payload = {
            id: existingUser._id,
            username: existingUser.username,
            email: existingUser.email,
            role: existingUser.role,
        }; //what to include in token
        const token = jwt.sign(payload, JWT_SECRET, {expiresIn: '30d'}); //30 day expiry
        return{token, existingUser}
    }

    async getUserById(userId: string){
        const user = await userRepository.getUserById(userId);
        if(!user){
            throw new HttpError(404, "User not found");
        }
        return user;
    }

    async updateUser(userId: string, data: UpdateUserDto) {
        const user = await userRepository.getUserById(userId);
        if (!user) {
            throw new HttpError(404, "User not found");
        }
        if(user.email !== data.email){
            const emailExists = await userRepository.getUserByEmail(data.email!);
            if(emailExists){
                throw new HttpError(403, "Email already in use");
            }
        }
        if(user.username !== data.username){
            const usernameExists = await userRepository.getUserByUsername(data.username!);
            if(usernameExists){
                throw new HttpError(403, "Username already in use");
            }
        }
        if(data.password){
            const hashedPassword = await bcrypts.hash(data.password, 10);
            data.password = hashedPassword;
        }
        const updatedUser = await userRepository.updateOneUser(userId, data);
        return updatedUser;
    }
}