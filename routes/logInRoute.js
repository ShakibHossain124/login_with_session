import express from 'express'
import { login } from '../controlles/loginController.js';

const Router = express.Router();

Router.post('/login', login);

export default Router;