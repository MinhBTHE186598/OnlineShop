import Accordion from 'react-bootstrap/Accordion';
import { useEffect, useState } from 'react';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import ResponseModal from './ResponseModal';
import axios from 'axios';
import ConfirmModal from './ConfirmModal';


export default function SupportManager() {
    const [supportList, setSupportList] = useState([{}])
    const [request, setRequest] = useState({})
    const [show, setShow] = useState(false)
    const [supportID, setSupportID] = useState(0)
    const [confirmShow, setConfirmShow] = useState(false)

    useEffect(() => {
        fetch("http://localhost:5000/contact/getdetail").then(
            response => response.json()
        ).then(
            data => {
                setSupportList(data)
            }
        )
    }, [])

    const handleResponse = (request) => {
        setShow(true)
        setRequest(request)
    }

    const handleChange = (id, content) => {
        setSupportList(supportList.map(support=>support.SupportID===id ? {...support, SupportResponse:content}:support))
    }

    const deleteSupport = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/contact/delete/${id}`);

            if (response.status === 200) {
                console.log('Support deleted successfully');
                // Handle success (e.g., update the UI)
            } else {
                console.error('Failed to delete support');
                // Handle failure
            }
            setSupportList(supportList.filter((support) => support.SupportID !== id));
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleDelete = (id) => {
        setSupportID(id)
        setConfirmShow(true)
    }

    return (
        <div>
            <Accordion defaultActiveKey="0">
                {supportList.map((support, id) => (
                    <Accordion.Item eventKey={id}>
                        <Accordion.Header>
                            <div style={{ display: 'flex', alignItems: 'center', width: '95%' }}>
                                #{support.SupportID}
                                <Image src={support.UserPFP} rounded thumbnail style={{ width: "33px", marginRight: '5px', marginLeft: '5px' }} />
                                {support.UserAccountName} : {support.SupportTitle}
                                {
                                    support.SupportResponse === null ?
                                        (<span style={{ color: 'red', marginLeft: '5px' }}>(Not yet responsed)</span>) :
                                        (<span style={{ color: 'green', marginLeft: '5px' }}>(Responsed)</span>)
                                }
                                <div style={{ marginLeft: 'auto' }}>
                                    {support.SupportResponse !== null &&
                                        (<Button variant="info" onClick={()=>handleResponse(support)} style={{ marginRight: '10px' }}>Edit</Button>)}
                                    <Button variant="danger" onClick={()=>handleDelete(support.SupportID)}>Delete</Button>
                                </div>

                            </div>
                        </Accordion.Header>
                        <Accordion.Body>
                            <p>Customer question: {support.SupportRequest}</p>
                            <p>Response : {support.SupportResponse === null ? 
                            (<Button variant="primary" onClick={()=>handleResponse(support)}>Response</Button>) :
                                (<span>{support.SupportResponse}</span>)}</p>
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
            <ResponseModal Request={request} show={show} onHide={()=>setShow(false)} handleChange={handleChange}/>
            <ConfirmModal show={confirmShow} onHide={() => setConfirmShow(false)} onConfirm={() => { deleteSupport(supportID) }} obj="user" />
        </div>
    )
}