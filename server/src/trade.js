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

tradeRouter.get('/search/stock', (req, res) => {
  const symbol = req.query.symbol;
  axios.get(`${BASE_URL}/stock/${symbol}/quote/`, {
    params: {
      token: process.env.IEX_TOKEN
    }
  }).then((response) => {
    res.status(200).json({
      success: true,
      companyName: response.data.companyName,
      symbol: symbol,
      price: response.data.latestPrice,
      change: response.data.changePercent
    });
  }).catch((error) => {
    console.log(error);
    res.send({
      success: false,
      symbol: symbol
    });
  });
});

tradeRouter.post('/trade/', async (req, res) => {
  const { accessToken, balance, stock, stockAmount, key } = req.body.data;
  const { id } = jwtDecode(accessToken);

  const transactionTotal = parseFloat(stockAmount) * parseFloat(stock.price);  
  const newBalance = (key === 'Buy' ? parseFloat(balance) - transactionTotal : parseFloat(balance) + transactionTotal);

  await updateUserStock(id, stock, stockAmount, key);
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
  if (userStocks.length === 0) return [];

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
    return [];
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
    stock['price'] = stockData[stock.stock_symbol].quote.latestPrice;
  };
  return userStocks;
};