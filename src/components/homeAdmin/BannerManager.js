import Row from 'react-bootstrap/Row';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import AddBannerModal from './AddBannerModal';
import EditBannerModal from './EditBannerModal';
import ConfirmModal from './ConfirmModal';

function BannerManager() {

    const [bannerList, setBannerList] = useState([{}])

    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showConfirm,setShowConfirm] = useState(false);

    const [bannerInf, setBannerInf] = useState({})
    const [bannerID, setBannerID] = useState('');

    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const handleUpdate = (updateBanner) => {
        setBannerList(bannerList.map((banner)=> banner.BannerID===updateBanner.BannerID?updateBanner:banner))
        setShowEdit(false);
    }

    // const handleAdd =(newbanner) => {
    //     setBannerList([...bannerList, newbanner]);
    // };
    useEffect(() => {
        fetch("http://localhost:5000/banner/getA").then(
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
    const handleDelete = (id) => {
        try{
            setBannerID(id)
            setShowConfirm(true)
        } catch (error) {
            console.error(error)
        }
    }

    const editBanner = async (banner) => {
        try {
            setBannerInf(banner)
            handleShowEdit()
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleAdd = (newBanner) =>{
        setBannerList([...bannerList, newBanner])
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
                            <Button variant="primary" onClick={() => handleDelete(banner.BannerID)}>Delete</Button>
                            <Button variant="primary" onClick={() => editBanner(banner)} style={{marginLeft:'10px'}}>Edit</Button>
                        </Card.Body>
                        <Card.Footer className="text-muted">Người đăng: {banner.UserAccountName} ({banner.UserFirstName} {banner.UserLastName}) </Card.Footer>
                    </Card>
                ))}
            </Row>
            <Row>
                <Button variant="primary" onClick={() => handleShow()}>Add</Button>
            </Row>
            <AddBannerModal show={show} onHide={handleClose} onAdd={handleAdd} bannerID={bannerList.length}/>
            <EditBannerModal show={showEdit} onHide={handleCloseEdit} Banner={bannerInf} onUpdate={handleUpdate}/>
            <ConfirmModal show={showConfirm} onHide={()=>setShowConfirm(false)} onConfirm={()=>deleteBanner(bannerID)} obj="banner"/>
        </div>
    )
}
export default BannerManager;