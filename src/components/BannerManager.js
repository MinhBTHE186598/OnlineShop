import Row from 'react-bootstrap/Row';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import AddBannerModal from './AddBannerModal';
import EditBannerModal from './EditBannerModal';

function BannerManager() {

    const [bannerList, setBannerList] = useState([{}])

    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    const [bannerID, setBannerID] = useState({})

    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        fetch("/banner/getA").then(
            response => response.json()
        ).then(
            data => {
                setBannerList(data)
            }
        )
    }, [])

    const deleteBanner = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/banner/delete/${id}`);
            if (response.status === 200) {
                console.log('Banner deleted successfully');
                // Handle success (e.g., update the UI)
            } else {
                console.error('Failed to delete banner');
                // Handle failure
            }
            setBannerList(bannerList.filter((banner) => banner.BannerID !== id));
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const editBanner = async (banner) => {
        try {
            setBannerID(banner)
            handleShowEdit()
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div id="wrapper">
            <Row>
                {bannerList.map((banner) => (
                    <Card className="text-center" style={{ marginBottom: '30px' }} >
                        <Card.Header>Banner ID: {banner.BannerID} </Card.Header>
                        <Card.Body>
                            <Card.Img variant="top" src={banner.BannerPic} />
                            <Card.Title>Danh mục: {banner.CategoryName}</Card.Title>
                            <Button variant="primary" onClick={() => deleteBanner(banner.BannerID)}>Delete</Button>
                            <Button variant="primary" onClick={() => editBanner(banner)} style={{marginLeft:'10px'}}>Edit</Button>
                        </Card.Body>
                        <Card.Footer className="text-muted">Người đăng: {banner.UserAccountName} </Card.Footer>
                    </Card>
                ))}
            </Row>
            <Row>
                <Button variant="primary" onClick={() => handleShow()}>Add</Button>
            </Row>
            <AddBannerModal show={show} onHide={handleClose} />
            <EditBannerModal show={showEdit} onHide={handleCloseEdit} Banner={bannerID}/>
        </div>
    )
}
export default BannerManager;