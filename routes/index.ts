import { Router } from 'express';
import api from './api';

class Routes {
    static configure(app: Router) {
        app.use('/api', api(Router()));
    }
}

export default Routes;