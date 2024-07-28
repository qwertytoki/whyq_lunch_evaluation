import express from 'express';
import menuRoutes from './routes/menuRoutes';

const app = express();

app.use(menuRoutes);

app.get('/health', (req, res) => {
  res.send('Hello World!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
