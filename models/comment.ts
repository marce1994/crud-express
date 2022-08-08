import { model, Types, Schema, Document } from "mongoose";
import { Article } from "./article";

// Comment interface
interface Comment extends Document {
    author: string;
    body: string;
    article: Article;
}

// Schema
const schema = new Schema<Comment>({
    author: { type: String, required: true },
    body: { type: String, required: true },
    article: { type: Types.ObjectId, ref: 'Article' },
}, { timestamps: true });

const comments = model<Comment>('Comment', schema);

// Export
export { comments, Comment };