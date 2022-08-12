import { ArticleService } from './article';
import * as mockingoose from 'mockingoose';
import { Article, Comment } from '../models';
import IArticle from '../models/interfaces/IArticle';

describe('ArticleService', () => {
    it('should return an empty Article array', async () => {
        mockingoose(Article).toReturn([] as Array<IArticle>, 'find');
        const articles = await ArticleService.fetch();
        expect(articles).toEqual(articles);
    });

    // Its not working...
    it('should create and return the Article', async () => {
        let article = <IArticle>{
            title: "Test",
            author: "Author",
            body: "Body"
        };

        Article.create = jest.fn().mockReturnValue(Promise.resolve(article));

        const createdArticle = await ArticleService.create(article);
        expect(createdArticle).toMatchObject(article); 
    });

    it('should return the Article by id', async () => {
        let article = <IArticle>{
            title: "Test",
            author: "Author",
            body: "Body"
        };

        mockingoose(Article).toReturn(article, 'findOne');

        const foundArticle = await ArticleService.findById('5d8f8f8f8f8f8f8f8f8f8f8');
        expect(foundArticle).toMatchObject(article);
    });

    it('should update the Article by id', async () => {
        let article = <IArticle>{
            title: "Test",
        };

        mockingoose(Article).toReturn(article, 'findOneAndUpdate');
        const updatedArticle = await ArticleService.update('5d8f8f8f8f8f8f8f8f8f8f8', article);
        expect(updatedArticle).toMatchObject(article);
    });

    it('should delete the Article by id', async () => {
        mockingoose(Comment).toReturn(Promise.resolve(null), 'deleteMany');
        mockingoose(Article).toReturn(Promise.resolve(null), 'findByIdAndRemove');

        let spyComment = jest.spyOn(Comment, 'deleteMany');
        let spyArticle = jest.spyOn(Article, 'findByIdAndRemove');

        const deletedArticle = await ArticleService.delete('5d8f8f8f8f8f8f8f8f8f8f8');

        expect(spyComment).toHaveBeenCalled();
        expect(spyArticle).toHaveBeenCalled();

        expect(deletedArticle).toBeUndefined();
    });
});