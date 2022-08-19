import { useState, useEffect } from 'react';
import axios from 'axios';

function useAccount() {
	const [balance, setBalance] = useState();
	const [stocks, setStocks] = useState([]);

	// initial render, grab balance and stock information
	useEffect(() => {
		async function getAccountInformation() {
			if (getAccessToken() === undefined) return;

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

	// functions to update balance and stock holdings based on buying stocks
	function buyStock(balance, stock, amount) {

	};

	function sellStock(balance, stock, amount) {

	};

	return { balance, stocks };
};

export default useAccount;

function getAccessToken() {
	return localStorage.getItem('token');
};