import { Router } from 'express';
import articles from './articles';

export default (router: any) => {
    router.use(`/articles`, articles(Router()));
    return router;
};
