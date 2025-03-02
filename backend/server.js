import express from 'express';
import cors from 'cors';
import connectDB from './config/mongodb.js';
import userRouter from './routes/userRouter.js';
import postsRouter from './routes/postsRouter.js';
import connectCloudinary from './config/cloudinary.js';
import leaderboardRouter from './routes/leaderboardRouter.js';

// defining app
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// database connect
connectDB();
connectCloudinary();
// Routes

app.use('/api/users', userRouter);
app.use('/api/posts',postsRouter);
app.use('/api/leaderboard',leaderboardRouter);


app.get('/', (req, res) => {
  res.send('API WORKING');
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
