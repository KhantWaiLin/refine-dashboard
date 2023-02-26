import express from 'express';

//import all the controllers
import { getAllUsers, getUserInfoById, createUser } from '../controller/user.controller.js';

const router = express.Router();

router.route('/').get(getAllUsers);
router.route('/').post(createUser);
router.route('/:id').get(getUserInfoById);

export default router;
