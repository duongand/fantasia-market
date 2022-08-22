import Card from 'react-bootstrap/Card';

function ErrorCard({ queryResult }) {
	return (
		<Card className="error-card">
			<Card.Body className="error-card--body">
				<Card.Title className="error-card--title">Error</Card.Title>
				<Card.Text className="error-card--text">
					{queryResult.symbol} is not a valid stock symbol.
				</Card.Text>
			</Card.Body>
		</Card>
	);
};

export default ErrorCard;