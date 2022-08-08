import { comments, Comment } from "../models";

class CommentService {
    static fetch() {
        return comments.find({}).lean().exec();
    }

    static findByArticleId(articleId: String) {
        return comments.find({ "articleId": articleId });
    }

    static find(id: String) {
        return comments.findOne({ "_id": id });
    }

    static create(comment: Comment) {
        return comments.create(comment);
    }

    static update(id: String, comment: Comment) {
        return comments.findByIdAndUpdate(id, comment).lean().exec();
    }

    static delete(id: String) {
        return comments.findByIdAndRemove(id).lean().exec();
    }

    static deleteByArticle(articleId: String) {
        return comments.findOneAndDelete({ "articleId": articleId }).lean().exec();
    }
}

export { CommentService };