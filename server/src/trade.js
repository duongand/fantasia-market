import dotenv from 'dotenv';
dotenv.config();

import axios from 'axios';
import express from 'express';
import jwtDecode from 'jwt-decode';

import {
	getUserBalance,
	getUserStocks
} from './database.js';

export const tradeRouter = express.Router();
const BASE_URL = 'https://cloud.iexapis.com/stable';

tradeRouter.get('/trade/user', async (req, res) => {
	const accessToken = req.query.accessToken;
	const { id } = jwtDecode(accessToken);
	const userBalance = await getUserBalance(id);
	const userStock = await getUserStocks(id);

	res.status(200).json({
		success: true,
		balance: userBalance.rows[0].balance,
		stocks: userStock.rows
	});
});

tradeRouter.get('/trade/stocks', (req, res) => {
	const symbol = req.query.symbol;
	console.log(symbol);
	axios.get(`${BASE_URL}/stock/${symbol}/quote/latestPrice`, {
		params: {
			token: process.env.IEX_TOKEN
		}
	}).then((response) => {
		res.status(200).json({
			symbol: symbol,
			price: response.data
		});
	}).catch((error) => {
		console.log(error);
	});
});