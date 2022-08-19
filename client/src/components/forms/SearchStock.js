import Form from 'react-bootstrap/Form';

function SearchStock({ queryDraft, handleChange, handleSubmit }) {
	return (
		<Form className="stock-search-bar" onSubmit={handleSubmit}>
			<Form.Control
				placeholder="Enter stock symbol.." 
				value={queryDraft}
				onChange={handleChange}
			/>
		</Form>
	);
};

export default SearchStock;