import { CommentController } from '../../controllers';

export default (router: any) => {
    router.get('/', CommentController.fetch);
    router.post('/', CommentController.create);
    router.get('/:id', CommentController.find);
    router.put('/:id', CommentController.update);
    router.delete('/:id', CommentController.remove);

    return router;
};