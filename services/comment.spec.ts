import IComment from '../models/interfaces/IComment';
import { CommentService } from './comment';
import { Query, Types } from 'mongoose';
import * as mockingoose from 'mockingoose';
import { Comment } from '../models';

let comment: IComment;
let commentId: string;
let articleId: string;

describe('CommentService', () => {
    
    beforeEach(() => {
        commentId = '62f165797d32723953981111';
        articleId = '62f165797d32723953982222';

        comment = <IComment>{
            _id: new Types.ObjectId(commentId),
            author: 'author',
            body: 'body',
            articleId: new Types.ObjectId(articleId)
        };
    });

    it('GetComments - by article empty', async () => {
        mockingoose(Comment).toReturn([], 'find');
        var result = await CommentService.findByArticleId(articleId);
        expect(result.length).toBe(0);
    });

    it('CreateComment - OK', async () => {
        jest.spyOn(Comment, 'create').mockImplementation(() => Promise.resolve(comment));

        var result = await CommentService.create(comment);

        expect(result.author).toBe(comment.author);
        expect(result.body).toBe(comment.body);
        expect(result._id.toString()).toBe(commentId);
    });

    it('CreateComment - and retrieve created', async () => {
        jest.spyOn(Comment, 'create').mockImplementation(() => Promise.resolve(comment));
        let created: any = await CommentService.create(comment);

        mockingoose(Comment).toReturn(created, 'findOne');
        var retrieved: any = await CommentService.findById(created._id);

        expect(created.author).toBe(retrieved.author);
        expect(created.body).toBe(retrieved.body);
        expect(created._id.toString()).toBe(retrieved._id.toString());
    });

    it('CreateComment - and retrieve a non existing comment', async () => {
        let commentSpyOn = jest.spyOn(Comment, 'create').mockImplementation(() => Promise.resolve(comment));
        await CommentService.create(comment);

        mockingoose(Comment).toReturn(null, 'findOne');
        var nonExisting = await CommentService.findById('111165797d3272395398efe7');

        expect(commentSpyOn).toHaveBeenCalled();
        expect(nonExisting).toBeNull();
    });

    it('UpdateComment - validate updated comment', async () => {
        mockingoose(Comment).toReturn(comment, 'save');
        
        let created = await CommentService.create(comment);
        let createdId = created._id.toString();
        
        comment.author = "updated";
        comment.body = "updated";

        let commentSpyOn = jest.spyOn(Comment, 'findOneAndUpdate').mockImplementation(() => <Query<unknown,unknown,{},IComment>>{ exec: () => Promise.resolve(comment) });
        await CommentService.update(createdId, comment);

        mockingoose(Comment).toReturn(comment, 'findOne');
        let updated: any = await CommentService.findById(createdId);

        expect(commentSpyOn).toHaveBeenCalled();
        expect(comment.author).toBe(updated.author);
        expect(comment.body).toBe(updated.body);
        expect(createdId).toBe(updated._id.toString());
    });

    it('DeleteComment - OK', async () => {
        mockingoose(Comment).toReturn(comment, 'findOneAndRemove');
        let created = await CommentService.create(comment);
        let createdId = created._id.toString();

        let commentSpyOn = jest.spyOn(Comment, 'findOneAndRemove').mockImplementation(() => <Query<unknown,unknown,{},IComment>>{ exec: () => Promise.resolve(comment) });
        await CommentService.delete(createdId);
        
        mockingoose(Comment).toReturn(null, 'findOne');
        var nonExisting = await CommentService.findById(commentId);

        expect(nonExisting).toBeNull();
    });
});