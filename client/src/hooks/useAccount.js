import { useState, useEffect } from 'react';
import axios from 'axios';

function useAccount(accessToken) {
	const [balance, setBalance] = useState(0);
	const [stocks, setStocks] = useState([]);
	const [portfolioWorth, setPortfolioWorth] = useState(0);

	useEffect(() => {
		async function getAccountInformation() {
			if (accessToken === '') {
				setBalance(0);
				setStocks([]);
				return;
			};

			axios.get('/trade/user', {
				params: {
					accessToken: accessToken
				}
			}).then((response) => {
				setBalance(response.data.balance);
				setStocks([...response.data.stocks]);
				setPortfolioWorth(computePortfolioWorth(response.data.stocks));
			}).catch((error) => {
				console.log(error);
			});
		};

		getAccountInformation();
	}, [accessToken]);

	function updatePurchasedStock(balance, purchasedAmount, purchasedStock) {
		axios.post('/trade/buy', {
			data: {
				accessToken: accessToken,
				balance: balance,
				purchasedStock: purchasedStock,
				purchasedAmount: purchasedAmount
			}
		}).then((response) => {
			setBalance(response.data.balance);
			setStocks([...response.data.stocks]);
			setPortfolioWorth(computePortfolioWorth(response.data.stocks));
		});
	};

	function updateSoldStock(balance, soldAmount, soldStock) {
		axios.post('/trade/sell', {
			data: {
				accessToken: accessToken,
				balance: balance,
				soldStock: soldStock,
				soldAmount: soldAmount
			}
		}).then((response) => {
			setBalance(response.data.balance);
			setStocks([...response.data.stocks]);
			setPortfolioWorth(computePortfolioWorth(response.data.stocks));
		});
	};

	function computePortfolioWorth(stocks) {
		let runningSum = 0;
		for (const stock of stocks) {
			runningSum += (stock.amount_own * stock.price);
		};
		return runningSum;
	};

	return { balance, stocks, portfolioWorth, updatePurchasedStock, updateSoldStock };
};

export default useAccount;