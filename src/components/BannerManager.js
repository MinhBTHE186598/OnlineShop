import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function BannerManager() {
    const [bannerList,setBannerList] = useState([{}])

    useEffect(() => {
        fetch("/banner/get").then(
            response => response.json()
        ).then(
            data => {
                setBannerList(data)
            }
        )
    }, [])

    return (
        <div id="wrapper">
            <Row>
                {bannerList.map((banner) => (
                    <Card className="text-center">
                    <Card.Header>Featured</Card.Header>
                    <Card.Body>
                    <Card.Img variant="top" src={banner.BannerPic} />
                      <Card.Title>Special title treatment</Card.Title>
                      <Button variant="primary">Delete</Button>
                    </Card.Body>
                    <Card.Footer className="text-muted"></Card.Footer>
                  </Card>
                ))}
            </Row>
        </div>
    )
}
export default BannerManager;