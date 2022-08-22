import Form from 'react-bootstrap/Form';

function SearchStock({ queryDraft, handleChange, handleSubmit }) {
	return (
		<Form className="stock-search-bar" onSubmit={handleSubmit}>
			<Form.Control
				className="stock-search-bar--input"
				placeholder="Enter stock symbol.." 
				value={queryDraft}
				onChange={handleChange}
			/>
		</Form>
	);
};

export default SearchStock;