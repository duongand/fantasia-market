import { useEffect, useState } from 'react';
import axios from 'axios';

function useStockSearch() {
	const [queryDraft, setQueryDraft] = useState('');
	const [stockQuery, setStockQuery] = useState('');
	const [queryResult, setQueryResult] = useState([]);

	function handleQueryChange(event) {
		setQueryDraft(event.target.value);
	};

	function submitStockQuery(event) {
		event.preventDefault();
		console.log(queryDraft);
		setStockQuery(queryDraft);
		console.log('searched updated');
	};

	useEffect(() => {
		if (stockQuery === '') return;

		axios.get('/trade/stocks', {
			params: {
				symbol: stockQuery
			}
		}).then((response) => {
			setQueryResult(response.data);
		}).catch((error) => {
			console.log(error);
		});
	}, [stockQuery]);

	return { queryDraft, stockQuery, queryResult, handleQueryChange, submitStockQuery };
};

export default useStockSearch;