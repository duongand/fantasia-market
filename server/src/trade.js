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
	const userStock = await compileStockArray(id);

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

tradeRouter.post('/trade/buy', async (req, res) => {
	const { accessToken, balance, purchasedStock, purchasedAmount } = req.body.data;
	const { id } = jwtDecode(accessToken);
	console.log(purchasedStock);
	const purchaseTotal = parseInt(purchasedAmount) * parseInt(purchasedStock.price);
	const newBalance = parseInt(balance) - purchaseTotal;

	updateUserStock(id, purchasedStock.symbol, purchasedAmount, 'buy');
	updateUserBalance(id, newBalance);

	const userBalance = await getUserBalance(id);
	const userStock = await compileStockArray(id);
	res.status(200).json({
		success: true,
		balance: userBalance,
		stocks: userStock
	});
});

tradeRouter.post('/trade/sell', async (req, res) => {
	const { accessToken, balance, soldStock, soldAmount } = req.body.data;
	const { id } = jwtDecode(accessToken);

	const soldTotal = parseInt(soldAmount) * parseInt(soldStock.price);
	const newBalance = parseInt(balance) + soldTotal;

	updateUserStock(id, soldStock.symbol, soldAmount, 'sell');
	updateUserBalance(id, newBalance);

	const userBalance = await getUserBalance(id);
	const userStock = await compileStockArray(id);
	res.status(200).json({
		success: true,
		balance: userBalance,
		stocks: userStock
	});
});

async function compileStockArray(userId) {
	const userStocks = await getUserStocks(userId);
	const stockSymbolString = createSymbolString(userStocks);
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

	return appendStockPrice(userStocks, stockData);
};

function createSymbolString(stocks) {
	const stockSymbols = [];
	for (const stock of stocks) {
		stockSymbols.push(stock.stock_symbol);
	};
	return stockSymbols.join(',');
};

function appendStockPrice(userStocks, stockData) {
	for (const stock of userStocks) {
		stock['price'] = stockData[stock.stock_symbol].quote.iexRealtimePrice;
	};
	return userStocks;
};