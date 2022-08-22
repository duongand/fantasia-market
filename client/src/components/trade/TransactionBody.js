import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import StockForm from '../forms/StockForm';

function TransactionBody({ balance, queryResult, amount, handleAmountChange, amountOwned }) {
  return (
    <Modal.Body className="modal--body">
      <Container>
        <Row className="modal--top-row">
          <Col md={6}>
            Latest Stock Price: <br /> $ {Math.round(queryResult.price * 100) / 100}
          </Col>
          <Col md={6}>
            Current owned shares: <br /> {amountOwned} shares
          </Col>
        </Row>
        <Row className="modal--bottom-row">
          <Col md={6}>
            Balance: $ {Math.round(balance * 100) / 100}
          </Col>
          <Col md={6}>
            <StockForm
              amount={amount}
              handleAmountChange={handleAmountChange}
            />
          </Col>
        </Row>
      </Container>
    </Modal.Body>
  );
};

export default TransactionBody;