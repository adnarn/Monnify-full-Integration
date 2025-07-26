import express from 'express';
import dontenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import itemRouter from './routes/itemRouter.js'
import monnifyRouter from './routes/monnifyRouter.js';

const app = express();
// middlewares
app.use(express.json());
app.use(cors());

// import routes
app.use('/api/items/', itemRouter)
app.use('/api/monnify', monnifyRouter);


dontenv.config();
const PORT = process.env.PORT || 3000;
const mongodb= process.env.MONGO_URI

// mongodb connection
mongoose.connect(mongodb)
.then(() => {
    console.log('MongoDB connected successfully');
}).catch((error) => {
    console.error('MongoDB connection error:', error);
});

app.get('/', (req, res)=>{
    res.send('Welcome to the Backend Class Tutorial!');
} )


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
