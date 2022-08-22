import { useEffect, useState } from 'react';
import axios from 'axios';

function useStockSearch() {
	const [queryDraft, setQueryDraft] = useState('');
	const [stockQuery, setStockQuery] = useState('');
	const [queryResult, setQueryResult] = useState({});

	function handleQueryChange(event) {
		setQueryDraft(event.target.value.toUpperCase());
	};

	function submitStockQuery(event) {
		event.preventDefault();
		setStockQuery(queryDraft);
	};

	useEffect(() => {
		if (stockQuery === '') return;

		axios.get('/search/stock', {
			params: {
				symbol: stockQuery
			}
		}).then((response) => {
			setQueryResult(response.data);
		}).catch((error) => {
			setQueryResult(error.response.data);
		});
	}, [stockQuery]);

	return { queryDraft, stockQuery, queryResult, handleQueryChange, submitStockQuery };
};

export default useStockSearch;