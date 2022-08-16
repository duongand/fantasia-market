import Form from 'react-bootstrap/Form';

function SearchStock() {
	return (
		<Form className="stock-search-bar">
			<Form.Control type="text" placeholder="Enter stock symbol.." />
		</Form>
	);
};

export default SearchStock;