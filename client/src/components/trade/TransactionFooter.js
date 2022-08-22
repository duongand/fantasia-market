import Modal from 'react-bootstrap/Modal';
import TransactionButtons from './TransactionButtons';

function TransactionFooter({ amount, subTotal, transactStocks, modalKey, closeModal, showWarning }) {
  return (
    <Modal.Footer>
      {showWarning ?
        <p className="modal--warning">Unable to {modalKey.toLowerCase()} {amount} shares.</p>
        :
        <p className="modal--sub-total">Transaction subtotal: $ {subTotal}</p>
      }
      <TransactionButtons
        transactStocks={transactStocks}
        modalKey={modalKey}
        closeModal={closeModal}
      />
    </Modal.Footer>
  );
};

export default TransactionFooter;