import express from 'express';
import menuRoutes from './routes/menuRoutes';
import reviewRoutes from './routes/reviewRoutes';

const app = express();
app.use(express.json());

app.use(menuRoutes);
app.use(reviewRoutes);

app.get('/health', (req, res) => {
    res.send('Hello World!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
