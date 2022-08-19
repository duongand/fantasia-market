import Container from 'react-bootstrap/Container';

import SearchStock from '../components/forms/SearchStock';
import SearchedStock from '../components/trade/SearchedStock';

function Trade({ queryDraft, queryResult, handleChange, handleSubmit }) {
	return (
		<Container className="trade--container">
			<h3 className="trade--header">Trading Page</h3>
			<SearchStock 
				queryDraft={queryDraft}
				handleChange={handleChange}
				handleSubmit={handleSubmit}
			/>
			{queryResult && <SearchedStock 
				queryResult={queryResult}
			/>}
		</Container>
	);
};

export default Trade;