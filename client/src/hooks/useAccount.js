import { useState, useEffect } from 'react';
import axios from 'axios';

function useAccount(accessToken) {
	const [balance, setBalance] = useState('');
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
				return;
			});
		};

		getAccountInformation();
	}, [accessToken]);

	function updateStocks(balance, stock, transactionAmount, key) {
		axios.post('/trade/', {
			data: {
				accessToken: accessToken,
				balance: balance,
				stock: stock,
				stockAmount: transactionAmount,
				key: key
			}
		}).then((response) => {
			setBalance(response.data.balance);
			setStocks([...response.data.stocks]);
			setPortfolioWorth(computePortfolioWorth(response.data.stocks));
		}).catch((error) => {
			return;
		});
	};

	function computePortfolioWorth(stocks) {
		let runningSum = 0;
		for (const stock of stocks) {
			runningSum += (stock.amount_own * stock.price);
		};
		
		return runningSum;
	};

	return { balance, stocks, portfolioWorth, updateStocks };
};

export default useAccount;