import Container from 'react-bootstrap/Container';

function AccountBalance({ balance }) {
	return (
		<Container className="account-balance--container">
			<h2 className="account-balance--header">Account Balance:</h2>
			<h3 className="account-balance--amount">$ {balance}</h3>	
		</Container>
	);
};

export default AccountBalance;