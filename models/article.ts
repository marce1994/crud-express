import { model, Schema } from 'mongoose';
import IArticle from './interfaces/IArticle';

const schema = new Schema<IArticle>({
    title: { type: String, required: true },
    author: { type: String, required: true },
    body: { type: String, required: true },
}, { timestamps: true });

const Article = model<IArticle>('Article', schema);

export default Article;