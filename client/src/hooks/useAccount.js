import { useState, useEffect } from 'react';
import axios from 'axios';

function useAccount() {
	const [balance, setBalance] = useState();
	const [stocks, setStocks] = useState([]);

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

	function updatePurchasedStock(balance, purchasedAmount, purchasedStock) {
		axios.post('/trade/buy', {
			data: {
				accessToken: getAccessToken(),
				balance: balance,
				purchasedStock: purchasedStock,
				purchasedAmount: purchasedAmount
			}
		}).then((response) => {
			setBalance(response.data.balance);
			setStocks(response.data.stocks);
		});
	};

	function updateSoldStock(balance, soldAmount, soldStock) {
		axios.post('/trade/sell', {
			data: {
				accessToken: getAccessToken(),
				balance: balance,
				soldStock: soldStock,
				soldAmount: soldAmount
			}
		}).then((response) => {
			setBalance(response.data.balance);
			setStocks(response.data.stocks);
		});
	};

	return { balance, stocks, updatePurchasedStock, updateSoldStock };
};

export default useAccount;

function getAccessToken() {
	return localStorage.getItem('token');
};