import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

import SearchStock from '../components/forms/SearchStock';
import SearchResult from '../components/trade/SearchResult';

function Trade({ balance, stocks, queryDraft, queryResult, handleChange, handleSubmit, amount, handleAmountChange, transactStocks, modalKey, showModal, openModal, closeModal }) {
	let navigate = useNavigate();

	useEffect(() => {
		if (localStorage.getItem('token') === null) navigate('../login', { replace: true });
	}, [navigate]);

	return (
		<Container className="trade--container">
			<SearchStock 
				queryDraft={queryDraft}
				handleChange={handleChange}
				handleSubmit={handleSubmit}
			/>
			{Object.keys(queryResult).length > 0 && <SearchResult 
				balance={balance}
				stocks={stocks}
				queryResult={queryResult}
				amount={amount}
				handleAmountChange={handleAmountChange}
				transactStocks={transactStocks}
				modalKey={modalKey}
				showModal={showModal}
				openModal={openModal}
				closeModal={closeModal}
			/>}
		</Container>
	);
};

export default Trade;