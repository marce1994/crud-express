import CommentController from '../controllers/comment';
import * as mocks from 'node-mocks-http';
import { CommentService } from '../services/comment';
import { ArticleService } from '../services';
import IComment from '../models/interfaces/IComment';
import { Types } from 'mongoose';

describe('CommentController', () => {

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('GetComment - Of non existing article', async function () {
        var req = mocks.createRequest();
        var res = mocks.createResponse();
        var next = () => { };

        req._setParameter('id', '62f165797d3272395398efe7')

        ArticleService.findById = jest.fn().mockResolvedValue(null);

        var spySend = jest.spyOn(res, 'send');

        await CommentController.fetch(req, res, next);

        expect(spySend).toHaveBeenCalledWith({ message: "Article not found" });
        expect(res.statusCode).toBe(404);
    });

    it('GetComment - Of existing article', async function () {
        const comment = <IComment>{
            author: 'author',
            body: 'body',
            articleId: new Types.ObjectId('62f165797d3272395398efe7')
        };
        var req = mocks.createRequest();
        var res = mocks.createResponse();
        var next = () => { };

        req._setParameter('id', '62f165797d3272395398efe7')
        CommentService.findByArticleId = jest.fn().mockResolvedValue([comment]);
        ArticleService.findById = jest.fn().mockResolvedValue({});
        var spySend = jest.spyOn(res, 'send');

        await CommentController.fetch(req, res, next);

        expect(spySend).toBeCalledWith([comment]);
        expect(res.statusCode).toBe(200);
    });

    it('GetComment - bad request', async function () {

        var req = mocks.createRequest();
        var res = mocks.createResponse();
        var next = () => { };

        req._setParameter('article', 'sdf')
        CommentController.findById(req, res, next);

        expect(res.statusCode).toBe(400);
    });

    it('GetComment - not found', async function () {

        var req = mocks.createRequest();
        var res = mocks.createResponse();
        var next = () => { };
        req._setParameter('id', '123165797d3272395398efe7')

        jest.spyOn(CommentService, 'findById').mockResolvedValue(null);
        var spySend = jest.spyOn(res, 'send');

        await CommentController.findById(req, res, next);

        expect(spySend).toBeCalledTimes(1);
        expect(res.statusCode).toBe(404);
    });

    it('UpdateComment - OK', async function () {

        var req = mocks.createRequest();
        var res = mocks.createResponse();
        var next = () => { };

        const comment = <IComment>{
            author: 'author',
            body: 'body',
            articleId: new Types.ObjectId('123165797d32723953989999')
        };

        req._setParameter('id', '123165797d32723953989999');
        req._addBody("comment", comment);

        jest.spyOn(CommentService, 'findById').mockResolvedValue(comment);
        jest.spyOn(CommentService, 'update').mockResolvedValue(comment);
        var spySend = jest.spyOn(res, 'send');

        await CommentController.update(req, res, next);

        expect(spySend).toBeCalledWith(comment);
        expect(res.statusCode).toBe(200);
    });

    it('UpdateComment - bad request', async function () {

        var req = mocks.createRequest();
        var res = mocks.createResponse();
        var next = () => { };

        const comment = <IComment>{
            author: 'author',
            body: 'body',
            articleId: new Types.ObjectId('123165797d32723953989999')
        };

        req._setParameter('id', 'qwewe');
        req._addBody("comment", comment);

        await CommentController.update(req, res, next);

        expect(res.statusCode).toBe(400);
    });

    it('DeleteComment - OK', async function () {

        var req = mocks.createRequest();
        var res = mocks.createResponse();
        var next = () => { };

        const comment = <IComment>{
            author: 'author',
            body: 'body',
            articleId: new Types.ObjectId('123165797d32723953989999')
        };

        req._setParameter('id', '123165797d32723953989999');
        req._addBody("comment", comment);

        jest.spyOn(CommentService, 'findById').mockResolvedValue(comment);
        jest.spyOn(CommentService, 'delete').mockResolvedValue(comment);

        var spyEnd = jest.spyOn(res, 'end');

        await CommentController.remove(req, res, next);

        expect(spyEnd).toHaveBeenCalledTimes(1);
        expect(res.statusCode).toBe(200);
    });

    it('DeleteComment - bad request', async function () {

        var req = mocks.createRequest();
        var res = mocks.createResponse();
        var next = () => { };

        const comment = <IComment>{
            author: 'author',
            body: 'body',
            articleId: new Types.ObjectId('123165797d32723953989999')
        };

        req._setParameter('id', 'qwewe');
        req._addBody("comment", comment);

        await CommentController.remove(req, res, next);

        expect(res.statusCode).toBe(400);
    });

    it('CreateComment - OK', async function () {

        var req = mocks.createRequest();
        var res = mocks.createResponse();
        var next = () => { };

        const comment = <IComment>{
            author: 'author',
            body: 'body',
            articleId: new Types.ObjectId('123165797d32723953989999')
        };

        req._setParameter('id', '123165797d32723953989999')
        req._addBody("comment", comment);

        jest.spyOn(CommentService, 'create').mockResolvedValue(comment);
        var spySend = jest.spyOn(res, 'send');

        await CommentController.create(req, res, next);

        expect(spySend).toBeCalledWith(comment);
        expect(res.statusCode).toBe(200);
    });
});