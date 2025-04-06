import express from 'express';
import { container } from 'tsyringe';
import { UserController } from './user.controller';

const router = express.Router();
const userController = container.resolve(UserController);

router.get('/', userController.get);

export default router;
