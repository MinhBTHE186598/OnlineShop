import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function FormGroupExample() {
  return (
    <Form id="wrapper" style={{ margin: '125px 30px' }}>
        <Form.Group className="mb-3" controlId="formGroupNameShop">
        <Form.Label>Shop name</Form.Label>
        <Form.Control type="shopname" placeholder="Enter shope name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupAddress">
        <Form.Label>Shop address</Form.Label>
        <Form.Control type="shopaddress" placeholder="Enter address" />
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPhone">
        <Form.Label>Phone</Form.Label>
        <Form.Control type="phone" placeholder="Phone" />
      </Form.Group>
    </Form>
  );
}

export default FormGroupExample;