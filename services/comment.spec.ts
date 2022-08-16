// import IComment from '../models/interfaces/IComment';
// import { CommentService } from './comment';
// import { Types } from 'mongoose';
// import * as mockingoose from 'mockingoose';
// import { Comment } from '../models';

// let comment: IComment;
// let commentId: '62f165797d32723953981111';
// let articleId: '62f165797d32723953982222';

// describe('CommentService', () => {
//     beforeEach(() => {
//         comment = <IComment>{
//             _id: '62f165797d32723953981111',
//             author: 'author',
//             body: 'body',
//             articleId: new Types.ObjectId('62f165797d32723953982222')
//         };
//         // CommentService.delete(commentId);
//     });    
    
//     it('GetComments - by article empty', async () => {
//         mockingoose(Comment).toReturn([], 'find');
//         var result = await CommentService.findByArticleId(articleId);
//         expect(result.length).toBe(0);
//     });

//     it('CreateComment - OK', async () => {
//         mockingoose(Comment).toReturn(comment, 'save');
        
//         var result = await CommentService.create(comment);

//         expect(result.author).toBe(comment.author);
//         expect(result.body).toBe(comment.body);
//         expect(result._id.toString()).toBe(commentId.toString());
//     });

//     it('CreateComment - and retrieve created', async () => {
//         mockingoose(Comment).toReturn(comment, 'save');
//         let created: any = await CommentService.create(comment);

//         mockingoose(Comment).toReturn(created, 'findOne');
//         var retrieved: any = await CommentService.findById(created._id);

//         expect(created.author).toBe(retrieved?.author);
//         expect(created.body).toBe(retrieved?.body);
//         expect(created._id.toString()).toBe(retrieved?._id.toString());
//     });

//     it('CreateComment - and retrieve a non existing comment', async () => {
//         let commentSpyOn = jest.spyOn(Comment, 'findOne').mockReturnValue(null);

//         await CommentService.create(comment);

//         mockingoose(Comment).toReturn(null, 'findOne');
//         var nonExisting = await CommentService.findById('111165797d3272395398efe7');

//         expect(commentSpyOn).toHaveBeenCalled();
//         expect(nonExisting).toBeNull();
//     });

//     it('UpdateComment - validate updated comment', async () => {
//         mockingoose(Comment).toReturn(comment, 'save');

//         let created = await CommentService.create(comment);
//         let createdId = created._id.toString();
//         comment.author = "updated";
//         comment.body = "updated";

//         mockingoose(Comment).toReturn(comment, 'findOneAndUpdate');
//         await CommentService.update(createdId, comment);

//         mockingoose(Comment).toReturn(comment, 'findOne');
//         let updated: any = await CommentService.findById(createdId); 

//         expect(comment.author).toBe(updated.author);
//         expect(comment.body).toBe(updated.body);
//         expect(createdId).toBe(updated._id.toString());
//     });

//     it('DeleteComment - OK', async () => {
//         mockingoose(Comment).toReturn(comment, 'save');
//         await CommentService.create(comment);

//         mockingoose(Comment).toReturn(null, 'findOneAndRemove');
//         await CommentService.delete(commentId);

//         var nonExisting = await CommentService.findById(commentId);

//         expect(nonExisting).toBeNull();
//     });

// });