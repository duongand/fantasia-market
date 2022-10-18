import Container from 'react-bootstrap/Container';

function AccountBalance({ balance, portfolioWorth }) {
	return (
		<Container className="account-balance--container">
			<h2 className="account-balance--header">Account Balance:</h2>
			<h3 className="account-balance--amount">$ {balance}</h3>	
			<br />
			<h3 className="account-balance--header">Porfolio Worth:</h3>
			<h4 className="account-balance--amount">$ {Math.round(portfolioWorth * 100) / 100}</h4>
		</Container>
	);
};

export default AccountBalance;