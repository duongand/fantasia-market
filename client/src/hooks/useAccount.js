import { useState, useEffect } from 'react';
import axios from 'axios';

function useAccount() {
	const [balance, setBalance] = useState();
	const [stocks, setStocks] = useState([]);

	// initial render, grab balance and stock information
	useEffect(() => {
		async function getAccountInformation() {
			if (getAccessToken() === null) return;

			axios.get('/trade/user', {
				params: {
					accessToken: getAccessToken()
				}
			}).then((response) => {
				setBalance(response.data.balance);
				setStocks(response.data.stocks);
			}).catch((error) => {
				console.log(error);
			});
		};

		getAccountInformation();
	}, []);

	function updatePurchasedStock(newBalance, purchasedAmount, purchasedStock) {
		const ownedStocks = 0;
		for (const stock of stocks) {
			if (stock.symbol === purchasedStock.symbol) {
				ownedStocks += stock.amount_own;
			};
		};

		axios.post('/trade/buy', {
			data: {
				accessToken: getAccessToken(),
				newBalance: newBalance,
				symbol: purchasedStock.symbol,
				newAmount: ownedStocks + purchasedAmount
			}
		}).then((response) => {
			console.log(response);
		});
	};

	return { balance, stocks, updatePurchasedStock };
};

export default useAccount;

function getAccessToken() {
	return localStorage.getItem('token');
};