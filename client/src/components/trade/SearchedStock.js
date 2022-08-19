import Button from 'react-bootstrap/Button';

function SearchedStockTable({ queryResult }) {
	return (
		<div className="search-result">
			<p>Stock Symbol: {queryResult.symbol}</p>
			<Button variant="success">Buy</Button>
			<Button variant="danger">Sell</Button>
		</div>
	);
};

export default SearchedStockTable;