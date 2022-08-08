

import { articles, Article } from "../models";
import { CommentService } from "./comment";

class ArticleService {
    static fetch(){
        return articles.find({}).lean().exec();
    }

    static find(id: String){
        return articles.findOne({"_id": id});
    }

    static create(article: Article){
        return articles.create(article);
    }

    static update(id: String, article: Article){
        return articles.findByIdAndUpdate(id, article).lean().exec();
    }
    
    static delete(id: String){
        CommentService.deleteByArticle(id);
        return articles.findByIdAndRemove(id).lean().exec();
    }
}

export { ArticleService };