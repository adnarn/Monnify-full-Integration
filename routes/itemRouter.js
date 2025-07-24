import express from 'express';
import {createItem} from '../controllers/itemController';
// const {createItem} = require('../controllers/itemController.js');

// decalare the itemRouter variable with express.Router() function
const itemRouter = express.Router()

// define the route for creating an item with a function in it
itemRouter.post('/create-chiddy', createItem)

// export the router 
export default itemRouter;

