import { Document } from "mongoose";

interface IArticle extends Document {
    title: string,
    author: string,
    body: string
}

export default IArticle;