import { ArticleController, CommentController } from '../../controllers';


export default (router: any) => {
    router.get('/:id/comments', CommentController.fetch);
    router.get('/', ArticleController.fetch);
    router.post('/', ArticleController.create);
    router.get('/:id', ArticleController.findById);
    router.put('/:id', ArticleController.update);
    router.delete('/:id', ArticleController.remove);

    return router;
};