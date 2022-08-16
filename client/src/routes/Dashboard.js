import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import AccountBalance from '../components/dashboard/AccountBalance';
import AccountVisual from '../components/dashboard/AccountVisual';
import StockTable from '../components/dashboard/StockTable';

function Dashboard() {
	return (
		<Container className="dashboard-container">
			<Row>
				<Col lg={1}></Col>
				<Col>
					<Row className="dashboard--overview-row">
						{/* Account balance */}
						<Col lg={6}>
							<AccountBalance />
						</Col>
						{/* Google visual of owned stocks */}
						<Col lg={6}>
							<AccountVisual />
						</Col>
					</Row>
					<Row className="dashboard--table-row">
						{/* Table of list of owned stocks */}
						<StockTable />
					</Row>
				</Col>
				<Col lg={1}></Col>
			</Row>
		</Container>
	);
};

export default Dashboard;