import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import AccountBalance from '../components/dashboard/AccountBalance';
import AccountVisual from '../components/dashboard/AccountVisual';
import StockTable from '../components/dashboard/StockTable';

function Dashboard({ accessToken, balance, stocks, portfolioWorth }) {
	let navigate = useNavigate();

	useEffect(() => {
		if (accessToken === null) navigate('../login', { replace: true });
	}, [accessToken, navigate]);

	return (
		<Container className="dashboard-container">
			<Row>
				<Col lg={1}></Col>
				<Col>
					<Row className="dashboard--overview-row">
						<Col lg={6}>
							<AccountBalance 
								balance={balance}
								portfolioWorth={portfolioWorth}
							/>
						</Col>
						<Col lg={6}>
							<AccountVisual 
								stocks={stocks}
							/>
						</Col>
					</Row>
					<Row className="dashboard--table-row">
						<StockTable 
							stocks={stocks}
						/>
					</Row>
				</Col>
				<Col lg={1}></Col>
			</Row>
		</Container>
	);
};

export default Dashboard;