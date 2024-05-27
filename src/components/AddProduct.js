import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';

function FormGroup() {
    return (
        <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ backgroundColor: 'white', width: '100%', maxWidth: '600px', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0 ,0, 0.1)' }}>
                <Form>
                    <h2 style={{ textAlign: 'center' }}>Đăng ký sản phẩm mới cho cửa hàng</h2>
                    <hr/>
                    <Form.Group>
                        <Form.Label><b>Tên sản phẩm:</b></Form.Label>
                        <Form.Control type="text" placeholder="Nhập tên sản phẩm" required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label><b>Giá sản phẩm:</b></Form.Label>
                        <Form.Control type="number" min={0} placeholder="Nhập giá sản phẩm (VND)" required/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label><b>Hình ảnh sản phẩm:</b></Form.Label><br />
                        <Form.Control type="text" placeholder="Nhập link hình ảnh sản phẩm" required/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label><b>Số lượng trong kho:</b></Form.Label>
                        <Form.Control type="number" min={0} placeholder="Nhập số lượng sản phẩm còn lại trong kho" required/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label><b>Mô tả sản phẩm:</b></Form.Label>
                        <Form.Control as="textarea" rows={5} placeholder="Nhập mô tả sản phẩm" required/>
                    </Form.Group>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', gap: '10px' }}>
                        <Button variant="danger" onClick={() => window.location.href = "/"}>
                            Huỷ
                        </Button>
                        <Button variant="primary" type="submit">
                            Đăng bán
                        </Button>
                    </div>
                </Form>
            </div>
        </Container>
    );
}

export default FormGroup;