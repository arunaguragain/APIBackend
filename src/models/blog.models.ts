import mongoose, { Schema } from "mongoose";
import { BlogType } from "../types/blog.type";

export interface IBlogModel extends Omit<BlogType, "authorId">, Document {
    _id: Schema.Types.ObjectId;
    authorId: Schema.Types.ObjectId; // mongodb implementation of author
    createdAt: Date;
    updatedAt: Date;
}
const schema = new Schema<IBlogModel>(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        authorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    },
    { timestamps: true }
);

export const BlogModel = mongoose.model<IBlogModel>("Blog", schema);