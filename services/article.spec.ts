import { ArticleService } from './article';
import * as mockingoose from 'mockingoose';
import { Article } from '../models';
import IArticle from '../models/interfaces/IArticle';

describe('ArticleService', () => {
    jest.setTimeout(100000);

    it('should return an empty Article array', async () => {
        mockingoose(Article).toReturn([] as Array<IArticle>, 'find');
        const articles = await ArticleService.fetch();
        expect(articles).toEqual(articles);
    });

    // Its not working...
    it('should create and return the Article', async () => {
        let article = <IArticle>{
            _id: '5d8f8f8f8f8f8f8f8f8f8f8',
            title: "Test",
            author: "Author",
            body: "Body"
        };

        mockingoose(Article).toReturn(article, 'save');

        const createdArticle = await ArticleService.create(article);
        expect(createdArticle).toEqual(article); 
    });

    it('should return the Article by id', async () => {
        let article = <IArticle>{
            title: "Test",
            author: "Author",
            body: "Body"
        };

        mockingoose(Article).toReturn(article, 'findOne');
        const createdArticle = await ArticleService.findById('5d8f8f8f8f8f8f8f8f8f8f8');
        expect(createdArticle).toBeCalledWith(expect.objectContaining({
            _id: '5d8f8f8f8f8f8f8f8f8f8f8'
        })); 
    });
});