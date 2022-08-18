import ArticleController from '../controllers/article';
import * as mocks from 'node-mocks-http';
import { ArticleService } from '../services/article';
import IArticle from '../models/interfaces/IArticle';
import { CommentService } from '../services';

describe('ArticleController', () => {
        
    afterEach(() => {
        jest.resetAllMocks();
    });
    
    it('GetArticles - WithoutArticles', async function() {
        var req = mocks.createRequest();
        var res = mocks.createResponse();

        var next = () => {};
        
        ArticleService.fetch = jest.fn().mockResolvedValue([]);
        
        var spySend = jest.spyOn(res, 'send');

        await ArticleController.fetch(req, res, next);

        expect(spySend).toHaveBeenCalledWith([]);
    });
    
    it('GetArticles - One Article', async function() {
        const article = <IArticle>{
            author: 'author',
            body: 'body',
            title: 'title'
        };
        var req = mocks.createRequest();
        var res = mocks.createResponse();
        var next = () => {};
        
        ArticleService.fetch = jest.fn().mockResolvedValue([article]);
        var spySend = jest.spyOn(res, 'send');
        
        await ArticleController.fetch(req, res, next);
        
        var body = res._getData();
        expect(spySend).toHaveBeenCalledWith([article]);
        expect(body.length).toBe(1);
        
    });

    it('GetArticleById - bad request', async function() {
        
        var req = mocks.createRequest();
        var res = mocks.createResponse();
        var next = () => {};
        
        req._setParameter('id','sdf');

        ArticleController.findById(req, res, next);
        expect(res.statusCode).toBe(400);
    });
    
    it('GetArticleById - not found', async function() {
        
        var req = mocks.createRequest();
        var res = mocks.createResponse();
        var next = () => {};
        req._setParameter('id','123165797d3272395398efe7')
        
        ArticleService.findById = jest.fn().mockResolvedValue(null);
        var spySend = jest.spyOn(res, 'send');
    
        await ArticleController.findById(req, res, next);
    
        expect(spySend).toHaveBeenCalledTimes(1);
        expect(res.statusCode).toBe(404);
    });
    
    it('GetArticleById - find one', async function() {
        const article = <IArticle>{
            _id: '62f165797d3272395398efe7',
            author: 'author',
            body: 'body',
            title: 'title'
        };
    
        var req = mocks.createRequest();
        var res = mocks.createResponse();
        var next = () => {};
        req._setParameter('id','62f165797d3272395398efe7')
        
        ArticleService.findById = jest.fn().mockResolvedValue(article);   
        var spySend = jest.spyOn(res, 'send');
    
        await ArticleController.findById(req, res, next);
    
        expect(spySend).toBeCalledTimes(1);
        expect(res.statusCode).toBe(200);
    });
    
    it('UpdateArticle - OK', async function() {    
        var req = mocks.createRequest();
        var res = mocks.createResponse();
        var next = () => {};
        
        var article = <IArticle>{
            _id: '62f165797d3272395398efe7',
            author: 'author',
            body: 'body',
            title: 'title'
        };
        
        req._setParameter('id','62f165797d3272395398efe7');
        req._addBody("article", article);

        ArticleService.findById = jest.fn().mockResolvedValue(article);
        ArticleService.update = jest.fn().mockResolvedValue(article);

        const spySend = jest.spyOn(res, 'send');
    
        await ArticleController.update(req, res, next);
        
        expect(ArticleService.findById).toHaveBeenCalledTimes(1);
        expect(ArticleService.update).toHaveBeenCalledTimes(1);
        expect(spySend).toHaveBeenCalledWith(article);
        expect(res.statusCode).toBe(200);
    });

    it('UpdateArticle - bad request', async function() {
        
        var req = mocks.createRequest();
        var res = mocks.createResponse();
        var next = () => {};
        
        var article = <IArticle>{
            _id: '62f165797d3272395398efe7',
            author: 'author',
            body: 'body',
            title: 'title'
        };
        
        req._setParameter('id','qwewe');
        req._addBody("article", article);
        jest.spyOn(ArticleService, 'update').mockResolvedValue(article);
    
        await ArticleController.update(req, res, next);
        expect(res.statusCode).toBe(400);
    });

    it('DeleteArticle - OK', async function() {    
        var req = mocks.createRequest();
        var res = mocks.createResponse();
        var next = () => {};
        
        var article = <IArticle>{
            _id: '62f165797d3272395398efe7',
            author: 'author',
            body: 'body',
            title: 'title'
        };
        
        req._setParameter('id','62f165797d3272395398efe7');
        req._addBody("article", article);
        var spyEnd = jest.spyOn(res, 'end');

        jest.spyOn(ArticleService, 'findById').mockResolvedValue(article);
        jest.spyOn(ArticleService, 'delete').mockResolvedValue(article);

        await ArticleController.remove(req, res, next);
    
        expect(spyEnd).toHaveBeenCalledTimes(1);
        expect(res.statusCode).toBe(200);
    });

    it('DeleteArticle - bad request', async function() {
        
        var req = mocks.createRequest();
        var res = mocks.createResponse();
        var next = () => {};
        
        var article = <IArticle>{
            _id: '62f165797d3272395398efe7',
            author: 'author',
            body: 'body',
            title: 'title'
        };
        
        req._setParameter('id','qwewe');
        req._addBody("article", article);
        jest.spyOn(ArticleService, 'delete').mockResolvedValue(article);
    
        await ArticleController.remove(req, res, next);

        expect(res.statusCode).toBe(400);
    });

    it('CreateArticle - OK', async function() {
        
        var req = mocks.createRequest();
        var res = mocks.createResponse();
        var next = () => {};
        
        var article = <IArticle>{
            _id: '62f165797d3272395398efe7',
            author: 'author',
            body: 'body',
            title: 'title'
        };
        
        req._setParameter('id','62f165797d3272395398efe7');
        req._addBody("article", article);

        var spySend = jest.spyOn(res, 'send');
        jest.spyOn(ArticleService, 'create').mockResolvedValue(article);
    
        await ArticleController.create(req, res, next);

        expect(spySend).toHaveBeenCalledWith(article);
        expect(res.statusCode).toBe(200);
    });
});