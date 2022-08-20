import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

import SearchStock from '../components/forms/SearchStock';
import SearchedStock from '../components/trade/SearchedStockTable';

function Trade({ balance, stocks, queryDraft, queryResult, handleChange, handleSubmit, amount, handleAmountChange, buyStock, showBuyStock, closeBuyModal, showBuyModal, sellStock, showSellStock, closeSellModal, showSellModal }) {
	let navigate = useNavigate();

	useEffect(() => {
		if (localStorage.getItem('token') === null) navigate('../login', { replace: true });
	}, [navigate]);

	return (
		<Container className="trade--container">
			<h3 className="trade--header">Trading Page</h3>
			<SearchStock 
				queryDraft={queryDraft}
				handleChange={handleChange}
				handleSubmit={handleSubmit}
			/>
			{Object.keys(queryResult).length > 0 && <SearchedStock 
				balance={balance}
				stocks={stocks}
				queryResult={queryResult}
				amount={amount}
				handleAmountChange={handleAmountChange}
				buyStock={buyStock}
				showBuyStock={showBuyStock}
				showBuyModal={showBuyModal}
				closeBuyModal={closeBuyModal}
				sellStock={sellStock}
				showSellStock={showSellStock}
				showSellModal={showSellModal}
				closeSellModal={closeSellModal}
			/>}
		</Container>
	);
};

export default Trade;