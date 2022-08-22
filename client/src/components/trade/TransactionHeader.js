import Modal from 'react-bootstrap/Modal';

function TransactionHeader({ queryResult }) {
  return (
    <Modal.Header>
      <Modal.Title className="modal--title">{queryResult.companyName} - {queryResult.symbol}</Modal.Title>
    </Modal.Header>
  );
};

export default TransactionHeader;