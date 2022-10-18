import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import AccountBalance from '../components/dashboard/AccountBalance';
import AccountVisual from '../components/dashboard/AccountVisual';
import StockTable from '../components/dashboard/StockTable';

function Dashboard({ balance, stocks, portfolioWorth }) {
  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token') === null) navigate('../login', { replace: true });
  }, [navigate]);

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
              {stocks.length > 0 ? <AccountVisual stocks={stocks}/> : <h3 className="stock-table--no-stocks-message">No stocks to display.</h3>}
            </Col>
          </Row>
          <Row className="dashboard--table-row">
            {stocks.length > 0 ? <StockTable stocks={stocks}/> : <></>}
          </Row>
        </Col>
        <Col lg={1}></Col>
      </Row>
    </Container>
  );
};

export default Dashboard;