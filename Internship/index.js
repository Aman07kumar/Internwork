import express from 'express';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import itemRoutes from './routes/itemRoutes.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware 
app.use(express.json());

// Route 
app.use('/items', itemRoutes);

// Connect to MongoDB
connectDB();

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
