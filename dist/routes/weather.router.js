import { Router } from 'express';
import weatherController from './../controllers/weather.controller.js';

const router = Router();

router.get('/', weatherController.index);

export default router;