import dotenv from 'dotenv';
dotenv.config();

import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import { expressjwt } from 'express-jwt';
import { authRouter } from './src/auth.js';
import { tradeRouter } from './src/trade.js';

const filePath = fileURLToPath(import.meta.url);
const __dirname = path.dirname(filePath);

const app = express();
const port = process.env.PORT || 3000;
const buildPath = path.join(__dirname, '..', 'client', 'build');

const jwtMW = expressjwt({
	secret: process.env.JWTSECRET,
	algorithms: ["HS256"]
});

app.use(express.static(buildPath));
app.use(express.json());
app.use(authRouter);
app.use(tradeRouter);
app.use('/auth', jwtMW);

app.get('/*', (req, res) => {
	res.sendFile('index.html', { root: buildPath });
});

app.listen(port, () => {
	console.log(`fantasia-market listening on port ${port}`);
});