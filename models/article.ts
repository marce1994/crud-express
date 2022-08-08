import { model, Types, Schema, Document } from 'mongoose';

// Comment interface
interface Article extends Document {
    title: string;
    author: string;
    body: string;
}

// Schema
const schema = new Schema<Article>({
    title: { type: String, required: true },
    author: { type: String, required: true },
    body: { type: String, required: true },
}, { timestamps: true });

const articles = model<Article>('Article', schema);

// Export
export { articles, Article };