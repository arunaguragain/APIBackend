import {IUser, UserModel} from "../models/user.model";

export interface IUserRepository {
    createUser(data: Partial<IUser>) : Promise<IUser>;
    getUserByUsername(username: string): Promise<IUser| null>;
    getUserByEmail(email : string) : Promise<IUser | null>;

}

export class UserRepository implements IUserRepository {
    async createUser(data: Partial<IUser>): Promise<IUser> {
        const user = new UserModel(data);  //MongoDb Model
        return await user.save();
    }

    async getUserByEmail(email : string): Promise<IUser | null> {
        const user = await UserModel.findOne({'email': email});  //MongoDb Model
        return user;
    }
     async getUserByUsername(username : string): Promise<IUser | null> {
        const user = await UserModel.findOne({'username': username});  //MongoDb Model
        return user;
    }
}