import Button from 'react-bootstrap/Button';

function TransactionButtons({ transactStocks, modalKey, closeModal }) {
  return (
    <>
      <Button className="modal--transact-button" variant="success" type="submit" value={modalKey} onClick={transactStocks}>{modalKey}</Button>
      <Button className="modal--close-button" variant="danger" onClick={closeModal}>Close</Button>
    </>
  );
};

export default TransactionButtons;