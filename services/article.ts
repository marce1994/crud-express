

import { Article } from "../models";
import { CommentService } from "./comment";
import { Types } from "mongoose";
import IArticle from "../models/interfaces/IArticle";

class ArticleService {
    static fetch(): Promise<IArticle[]>{
        return Article.find({}).lean().exec();
    }

    static findById(id: string): Promise<IArticle | null>{
        return Article.findOne({"_id": id}).lean().exec();
    }

    static create(article: IArticle): Promise<IArticle>{
        return Article.create(article);
    }

    static update(id: string, article: IArticle): Promise<IArticle>{
        return Article.findByIdAndUpdate(id, article, { new: true }).exec();
    }
    
    static delete(id: string): Promise<any>{
        CommentService.deleteByArticleId(id);
        return Article.findByIdAndRemove(id).exec();
    }
}

export { ArticleService };