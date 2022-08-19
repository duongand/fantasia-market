import dotenv from 'dotenv';
dotenv.config();

import axios from 'axios';
import express from 'express';
import jwtDecode from 'jwt-decode';

import {
	getUserBalance,
	getUserStocks,
	updateUserStock,
	updateUserBalance
} from './database.js';

export const tradeRouter = express.Router();
const BASE_URL = 'https://cloud.iexapis.com/stable';

tradeRouter.get('/trade/user', async (req, res) => {
	const accessToken = req.query.accessToken;
	const { id } = jwtDecode(accessToken);
	const userBalance = await getUserBalance(id);
	const userStock = await getUserStocks(id);
	
	const stockSymbolString = createSymbolString(userStock);
	const stockData = await axios.get(`${BASE_URL}/stock/market/batch`, {
		params: {
			symbols: stockSymbolString,
			types: 'quote',
			token: process.env.IEX_TOKEN
		}
	}).then((response) => {
		return response.data;
	}).catch((error) => {
		console.log(error);
	});

	for (const stock of userStock) {
		stock['price'] = stockData[stock.stock_symbol].quote.iexRealtimePrice;
	};

	res.status(200).json({
		success: true,
		balance: userBalance,
		stocks: userStock
	});
});

tradeRouter.get('/trade/stock', (req, res) => {
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

tradeRouter.post('/trade/buy', (req, res) => {
	const { accessToken, newBalance, symbol, newAmount } = req.body.data;
	const id = jwtDecode(accessToken);

	updateUserStock(id, symbol, newAmount);
	updateUserBalance(id, newBalance);
});

function createSymbolString(stocks) {
	const stockSymbols = [];
	for (const stock of stocks) {
		stockSymbols.push(stock.stock_symbol);
	};
	return stockSymbols.join(',');
};