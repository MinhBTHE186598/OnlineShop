import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function AdminAction() {
    return (
        <ListGroup>
            <Row>
                <Col sm={8}>
                    <ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-start"
                        action variant="info"
                    >
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">Quản lý người dùng</div>
                            Thêm, sửa xóa người dùng
                        </div>
                    </ListGroup.Item>
                    <ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-start"
                        action variant="info"
                    >
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">Quản lý danh mục sản phẩm</div>
                            Thêm, sửa, xóa danh mục sản phẩm
                        </div>
                    </ListGroup.Item>
                    <ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-start"
                        action variant="info"
                    >
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">Quản lý banner</div>
                            Cài đặt banner
                        </div>
                    </ListGroup.Item>
                    <ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-start"
                        action variant="info"
                    >
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">Kiểm duyệt sản phẩm</div>
                            Yêu cầu đăng sản phẩm
                        </div>
                        <Badge bg="primary" pill>
                            14
                        </Badge>
                    </ListGroup.Item>
                </Col>
            </Row>
        </ListGroup>    
    );
}

export default AdminAction;