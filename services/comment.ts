import { Comment } from "../models";
import IComment from "../models/interfaces/IComment";


class CommentService {

    static async findById(id: String): Promise<IComment> {
        return await Comment.findById(id).exec();
    }

    static findByArticleId(articleId: String): Promise<IComment[]> {
        return Comment.find({ "articleId": articleId }).lean().exec();
    }

    static create(comment: IComment): Promise<IComment> {
        return Comment.create(comment);
    }
    
    static update(id: String, comment: IComment): Promise<IComment> {
        return Comment.findByIdAndUpdate(id, comment).exec();
    }

    static delete(id: String): Promise<any> {
        return Comment.findByIdAndRemove(id).exec();
    }

    static deleteByArticleId(articleId: String): Promise<any> {
        return Comment.deleteMany({ "article": articleId }).exec();
    }
}

export { CommentService };