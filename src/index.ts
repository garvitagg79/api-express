import express, {json, urlencoded} from "express";
import productsRoutes from "./routes/products/index.js";
import authRoutes from './routes/auth/index.js';
import orderRoutes from './routes/orders/index.js';
import serverless from "serverless-http"

const PORT = 3000;

const app = express();

app.use(urlencoded({extended: false}));
app.use(json())

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use('/products', productsRoutes);
app.use('/auth', authRoutes);
app.use('/orders', orderRoutes);

if (process.env.NODE_ENV === 'dev') {
  app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
}

export const handler =  serverless(app);

