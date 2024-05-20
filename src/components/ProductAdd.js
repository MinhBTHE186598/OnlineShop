import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



function FormGroup() {
    return (
        <Form>
            <Form.Group>
                <Form.Label>Product Name:</Form.Label>
                <Form.Control type="productName" placeholder="Enter product name" />
            </Form.Group>
            <Form.Group>
                <Form.Label>Product Price:</Form.Label>
                <Form.Control type="productPrice" placeholder="Enter product price" />
            </Form.Group>
            <Form.Group>
                <Form.Label>Product Picture:</Form.Label>
                <Form.Control type="productPicture" placeholder="Enter product picture url" />
                <input id="filebutton" name="filebutton" class="input-file" type="file"/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Stock Quantity:</Form.Label>
                <Form.Control type="productQuantity" placeholder="Enter amount of this product in stock" />
            </Form.Group>
            <Form.Group>
                <Form.Label>Product Description:</Form.Label>
                <Form.Control type="productDescription" placeholder="Enter product description" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
            
        </Form>
    );
}

export default FormGroup;