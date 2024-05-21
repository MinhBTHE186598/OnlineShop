import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';

function FormGroup() {
    return (
        <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ backgroundColor: 'white', width: '100%', maxWidth: '600px', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0 ,0, 0.1)' }}>
                <Form>
                    <h2 style={{ textAlign: 'center' }}>Add an Product</h2>
                    <Form.Group>
                        <Form.Label>Product Name:</Form.Label>
                        <Form.Control type="text" placeholder="Enter product name" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Product Price:</Form.Label>
                        <Form.Control type="text" placeholder="Enter product price" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Product Picture:</Form.Label><br />
                        <input id="filebutton" name="filebutton" className="input-file" type="file" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Stock Quantity:</Form.Label>
                        <Form.Control type="text" placeholder="Enter amount of this product in stock" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Product Description:</Form.Label>
                        <Form.Control type="text" placeholder="Enter product description" />
                    </Form.Group>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', gap: '10px' }}>
                        <Button variant="danger" onClick={() => window.location.href = "/"}>
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </div>
                </Form>
            </div>
        </Container>
    );
}

export default FormGroup;