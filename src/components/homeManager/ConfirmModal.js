import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


function confirmModal({ show, onHide, onConfirm, obj }) {
    const cf = () => {
        onConfirm()
        onHide()
    }
    return (

        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Waring</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete this {obj}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={cf}>
                    Confirm
                </Button>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default confirmModal;