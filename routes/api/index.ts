import { Router } from 'express';
import articles from './articles';
import comments from './comments';

export default (router: any) => {
    router.use(`/articles`, articles(Router()));
    router.use(`/comments`, comments(Router()));

    return router;
};
