import { connect, connection } from 'mongoose';
import { ArticleController, CommentController } from '../controllers';
import { describe, test, expect } from '@jest/globals';
import { Article, Comment } from '../models';
import IArticle from '../models/interfaces/IArticle';
import IComment from '../models/interfaces/IComment';

describe('ArticleService', () => {
    jest.setTimeout(100000);

    let req = {};
    let res = { send: jest.fn(), end: jest.fn() };

    const next = jest.fn((error) => console.error(error));

    beforeAll(async () => {
        await connect('mongodb://localhost/test');
    });

    afterAll(async () => {
        await connection.collections.articles.drop();
        await connection.collections.comments.drop();
        await connection.close();
    });

    beforeEach(() => {
        req = {};
        res.send.mockClear();
        res.end.mockClear();
        next.mockClear();
    });

    test('should return an empty Article array', async () => {
        await ArticleController.fetch(req as any, res as any, next);

        expect(next).not.toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledTimes(1);
        expect(res.send).toHaveBeenCalledWith(expect.any(Array<IArticle>));
        expect(res.send).toHaveBeenCalledWith(expect.arrayContaining([]));
    });

    var createdArticle = {} as IArticle;
    test('should return an Article', async () => {
        const article = {
            title: "Test",
            author: "Author",
            body: "Body"
        } as IArticle;

        req = { body: article };

        await ArticleController.create(req as any, res as any, next);

        expect(next).not.toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledTimes(1);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining(article as any));
        createdArticle = res.send.mock.calls[0][0] as IArticle;
    });

    let createdComment = {} as IComment;
    test('should create a comment', async () => {
        console.log(createdArticle);
        const comment = <IComment>{
            body: "Comment",
            author: "Author",
            articleId: createdArticle._id
        };

        req = { body: comment };

        await CommentController.create(req as any, res as any, next);

        expect(next).not.toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledTimes(1);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining(comment as any));
        createdComment = res.send.mock.calls[0][0] as IComment; // TODO: fix this
    });

    test('should return a list of comments', async () => {
        console.log(createdComment);
        req = { query: { articleId: createdArticle._id } };
        await CommentController.fetch(req as any, res as any, next);

        expect(next).not.toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledTimes(1);
        expect(res.send).toHaveBeenCalledWith(expect.any(Array<Comment>));

        expect(res.send).toHaveBeenCalledWith(expect.arrayContaining([expect.objectContaining({
            author: createdComment.author,
            body: createdComment.body,
            articleId: createdComment.articleId,
            _id: createdComment._id
        } as any)]));
    });

    let editedComment: IComment;

    test('should edit comment', async () => {
        editedComment = <IComment>{ body: `edited ${createdComment.body}`, _id: createdComment._id };

        req = { body: editedComment, params: { id: createdComment._id } };

        await CommentController.update(req as any, res as any, next);

        expect(next).not.toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledTimes(1);
        
    });

    test('should return edited comment', async () => {
        req = { params: { id: createdComment._id } };

        await CommentController.findById(req as any, res as any, next);

        expect(next).not.toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledTimes(1);

        const comment = res.send.mock.calls[0][0] as IComment;
        expect(comment.body).toEqual(editedComment.body);
    });

    test('should delete comment', async () => {
        req = { params: { id: createdComment._id } };

        await CommentController.remove(req as any, res as any, next);

        expect(next).not.toHaveBeenCalled();
        expect(res.send).not.toHaveBeenCalled();
        expect(res.end).toHaveBeenCalledTimes(1);
    });

    test('should return an empty list of comments', async () => {
        req = { query: { articleId: createdArticle._id } };
        await CommentController.fetch(req as any, res as any, next);

        expect(next).not.toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledTimes(1);
        expect(res.send).toHaveBeenCalledWith(expect.any(Array<Comment>));
        expect(res.send).toHaveBeenCalledWith(expect.arrayContaining([]));
    });

    let editedArticle: IArticle;
    test('should edit article', async () => {
        editedArticle = <IArticle>{ body: `edited ${createdArticle.body}`, _id: createdArticle._id };

        req = { body: editedArticle, params: { id: createdArticle._id } };

        await ArticleController.update(req as any, res as any, next);

        expect(next).not.toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledTimes(1);
    });

    test('should return edited article', async () => {
        req = { params: { id: createdArticle._id } };

        await ArticleController.findById(req as any, res as any, next);

        expect(next).not.toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledTimes(1);

        const article = res.send.mock.calls[0][0] as IArticle;
        expect(article.body).toEqual(editedArticle.body);
    });

    test('should delete article', async () => {
        req = { params: { id: createdArticle._id } };

        await ArticleController.remove(req as any, res as any, next);

        expect(next).not.toHaveBeenCalled();
        expect(res.send).not.toHaveBeenCalled();
        expect(res.end).toHaveBeenCalledTimes(1);
    });

    test('should return an empty list of articles', async () => {
        await ArticleController.fetch(req as any, res as any, next);

        expect(next).not.toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledTimes(1);
        expect(res.send).toHaveBeenCalledWith(expect.any(Array<IArticle>));
        expect(res.send).toHaveBeenCalledWith(expect.arrayContaining([]));
    });
});