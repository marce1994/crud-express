import { CommentController } from '../../controllers';

export default (router: any) => {
    router.post('/', CommentController.create);
    router.get('/:id', CommentController.findById);
    router.put('/:id', CommentController.update);
    router.delete('/:id', CommentController.remove);

    return router;
};