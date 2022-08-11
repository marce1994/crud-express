import { model, Schema } from "mongoose";
import IComment from "./interfaces/IComment";

const { ObjectId } = Schema.Types;
const schema = new Schema<IComment>({
    author: { type: String, required: true },
    body: { type: String, required: true },
    articleId: { type: ObjectId, required: true }
}, { timestamps: true });

const Comment = model<IComment>('Comment', schema);

export default Comment;