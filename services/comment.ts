import { Comment } from "../models";
import IComment from "../models/interfaces/IComment";


class CommentService {
    static findById(id: String): Promise<IComment | null> {
        return Comment.findById(id).exec();
    }

    static findByArticleId(articleId: String): Promise<IComment[]> {
        return Comment.find({ "articleId": articleId }).lean().exec();
    }

    static create(comment: IComment): Promise<IComment> {
        return Comment.create(comment);
    }

    static update(id: String, comment: IComment): Promise<IComment> {
        return Comment.findByIdAndUpdate(id, comment, { new: true }).exec();
    }

    static delete(id: String): Promise<any> {
        return Comment.findByIdAndRemove(id).exec();
    }

    static deleteByArticleId(articleId: String): Promise<any> {
        return Comment.deleteMany({ "article": articleId }).exec();
    }
}

export { CommentService };