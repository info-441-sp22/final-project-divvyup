import express from 'express';
var router = express.Router();

import itemsRouter from './controllers/items.js';
import tripsRouter from './controllers/trips.js';
import usersRouter from './controllers/users.js';

router.use('/items', itemsRouter);
router.use('/trips', tripsRouter);
router.use('/users', usersRouter);

export default router;