import { Types, Document } from "mongoose";

interface IComment extends Document {
    author: string,
    body: string,
    articleId: Types.ObjectId
}

export default IComment;