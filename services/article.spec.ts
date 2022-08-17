import { ArticleService } from './article';
import * as mockingoose from 'mockingoose';
import { Article, Comment } from '../models';
import IArticle from '../models/interfaces/IArticle';
import { Query } from 'mongoose';
import { CommentService } from './comment';


let article: IArticle;
let articleId: string;

describe('ArticleService', () => {

    beforeEach(() => {
        articleId = '62f165797d3272395398efe7';
        article = <IArticle>{
            _id: articleId,
            author: 'author',
            body: 'body',
            title: 'title'
        };
    });

    it('GetArticles - WithoutArticles', async function () {
        mockingoose(Article).toReturn([], 'find');
        var result = await ArticleService.fetch();
        expect(result.length).toBe(0);
    });

    it('CreateArticle - OK', async function () {
        jest.spyOn(Article, 'create').mockImplementation(() => Promise.resolve(article));
        var result = await ArticleService.create(article);

        expect(result.title).toBe(article.title);
        expect(result.author).toBe(article.author);
        expect(result.body).toBe(article.body);
        expect(result._id.toString()).toBe(articleId);
    });

    it('CreateArticle - and retrieve created', async function () {
        jest.spyOn(Article, 'create').mockImplementation(() => Promise.resolve(article));
        let created: any = await ArticleService.create(article);

        mockingoose(Article).toReturn(created, 'findOne');
        var retrieved: any = await ArticleService.findById(created._id);

        expect(created.title).toBe(retrieved.title);
        expect(created.author).toBe(retrieved.author);
        expect(created.body).toBe(retrieved.body);
        expect(created._id.toString()).toBe(retrieved._id.toString());
    });

    it('CreateArticle - and retrieve a non existing article', async function () {
        let articleSpyOn = jest.spyOn(Article, 'create').mockImplementation(() => Promise.resolve(article));
        await ArticleService.create(article);

        mockingoose(Article).toReturn(null, 'findOne');
        var nonExisting = await ArticleService.findById('111165797d3272395398efe7');

        expect(articleSpyOn).toHaveBeenCalled();
        expect(nonExisting).toBe(null);
    });

    it('UpdateArticle - validate updated article', async function () {
        mockingoose(Article).toReturn(article, 'save');

        let created = await ArticleService.create(article);
        let createdId = created._id.toString();

        article.title = "updated";
        article.author = "updated";
        article.body = "updated";

        jest.spyOn(Article, 'findOneAndUpdate').mockImplementation(() => <Query<unknown, unknown, {}, IArticle>>{ exec: () => Promise.resolve(article) });
        await ArticleService.update(createdId.toString(), article);

        mockingoose(Article).toReturn(article, 'findOne');
        let updated: any = await ArticleService.findById(createdId);

        expect(article.title).toBe(updated.title);
        expect(article.author).toBe(updated.author);
        expect(article.body).toBe(updated.body);
        expect(createdId.toString()).toBe(updated._id.toString());
    });

    it('DeleteArticle - OK', async function () {
        mockingoose(Article).toReturn(article, 'save');
        await ArticleService.create(article);

        let articleSpyOn = jest.spyOn(Article, 'findByIdAndRemove').mockImplementation(() => <Query<unknown, unknown, {}, IArticle>>{ exec: () => Promise.resolve(article) });
        let commentDeleteSpyOn = jest.spyOn(CommentService, 'deleteByArticleId').mockImplementation(() => Promise.resolve());
        await ArticleService.delete(articleId);

        mockingoose(Article).toReturn(null, 'findOne');
        var nonExisting = await ArticleService.findById(articleId);

        expect(commentDeleteSpyOn).toHaveBeenCalledWith(articleId);
        expect(articleSpyOn).toHaveBeenCalled();
        expect(nonExisting).toBeNull();
    });
});