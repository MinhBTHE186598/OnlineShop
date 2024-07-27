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
                <Modal.Title>Cảnh báo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Bạn có chắc bạn muốn xóa {obj} này
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={cf}>
                    Xác nhận
                </Button>
                <Button variant="secondary" onClick={onHide}>
                    Đóng
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default confirmModal;