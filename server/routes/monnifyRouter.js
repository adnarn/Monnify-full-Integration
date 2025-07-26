import express from 'express';
import { getPaymentDetails, initializeTransaction, webhookHandler } from '../controllers/monnifyController.js';

const monnifyRouter = express.Router();

monnifyRouter.post('/initialize-payment', initializeTransaction);
monnifyRouter.post("/webhook", webhookHandler);
monnifyRouter.get("/get", getPaymentDetails )

export default monnifyRouter;