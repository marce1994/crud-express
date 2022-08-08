import { ArticleController } from '../../controllers';

export default (router: any) => {
    router.get('/', ArticleController.fetch);
    router.post('/', ArticleController.create);
    router.get('/:id', ArticleController.find);
    router.put('/:id', ArticleController.update);
    router.delete('/:id', ArticleController.remove);

    return router;
};