import Container from 'react-bootstrap/Container';

import SearchStock from '../components/forms/SearchStock';
import SearchedStockTable from '../components/trade/SearchedStockTable';

function Trade() {
	return (
		<Container className="trade--container">
			<h3 className="trade--header">Trading Page</h3>
			<SearchStock />
			<SearchedStockTable />
		</Container>
	);
};

export default Trade;