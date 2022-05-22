import express from 'express';
var router = express.Router();

import itemsRouter from './controllers/items.js';
import tripsRouter from './controllers/trips.js';

router.use('/items', itemsRouter);
router.use('/trips', tripsRouter);

export default router;