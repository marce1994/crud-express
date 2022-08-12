import * as mockingoose from 'mockingoose';
import { Comment } from '../models';
import IComment from '../models/interfaces/IComment';
import { CommentService } from './comment';
import { Types } from 'mongoose';

describe('CommentService', () => {
    it('should return an empty Article array', async () => {
        let _doc = <IComment>{
            articleId: new Types.ObjectId('6d8f8f8f8f8f8f8f8f8f8f8f'),
            body: 'Body',
            author: 'Author'
        };

        mockingoose(Comment).toReturn(_doc, 'findOne');
        const spyComment = jest.spyOn(Comment, 'findById');

        const comment = await CommentService.findById('5d8f8f8f8f8f8f8f8f8f8f8f');

        expect(spyComment).toHaveBeenCalledWith("5d8f8f8f8f8f8f8f8f8f8f8f");
        expect(comment).toMatchObject({
            articleId: _doc.articleId,
            body: _doc.body,
            author: _doc.author,
            _id: comment._id
        });
    });

    it('should create and return the Comment', async () => {
        let _doc = <IComment>{
            articleId: new Types.ObjectId('6d8f8f8f8f8f8f8f8f8f8f8f'),
            body: 'Body',
            author: 'Author'
        };

        Comment.create = jest.fn().mockReturnValue(Promise.resolve(_doc));
        const spyComment = jest.spyOn(Comment, 'create');

        const createdComment = await CommentService.create(_doc);

        expect(spyComment).toHaveBeenCalledWith(_doc);
        expect(createdComment).toMatchObject(_doc);
    });

    it('should return the Comment by id', async () => {
        let _doc = <IComment>{
            articleId: new Types.ObjectId('6d8f8f8f8f8f8f8f8f8f8f8f'),
            body: 'Body',
            author: 'Author'
        };

        mockingoose(Comment).toReturn(_doc, 'findOne');
        const spyComment = jest.spyOn(Comment, 'findById');

        const comment = await CommentService.findById('5d8f8f8f8f8f8f8f8f8f8f8');

        expect(spyComment).toHaveBeenCalledWith('5d8f8f8f8f8f8f8f8f8f8f8');
        expect(comment).toMatchObject(_doc);
    });

    it('should update the Comment by id', async () => {
        let _doc = <IComment>{
            articleId: new Types.ObjectId('6d8f8f8f8f8f8f8f8f8f8f8f'),
            body: 'Body',
            author: 'Author'
        };

        // I don't know what I'm doing here sorry :/
        Comment.findByIdAndUpdate = jest.fn().mockReturnValue({ exec: jest.fn().mockReturnValue(Promise.resolve(_doc)) });

        const spyComment = jest.spyOn(Comment, 'findByIdAndUpdate');

        const updatedComment = await CommentService.update('5d8f8f8f8f8f8f8f8f8f8f8f', {
            body: 'Updated body'
        } as IComment);

        expect(spyComment).toHaveBeenCalledWith('5d8f8f8f8f8f8f8f8f8f8f8f', { body: 'Updated body' } as IComment);
        expect(updatedComment).toMatchObject(_doc);
    });

});