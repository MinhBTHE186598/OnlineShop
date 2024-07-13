import Accordion from 'react-bootstrap/Accordion';
import { useEffect, useState } from 'react';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';


export default function SupportManager() {
    const [supportList, setSupportList] = useState([{}])

    useEffect(() => {
        fetch("http://localhost:5000/contact/getdetail").then(
            response => response.json()
        ).then(
            data => {
                setSupportList(data)
            }
        )
    }, [])

    return (
        <div>

            <Accordion defaultActiveKey="0">
                {supportList.map((support, id) => (
                    <Accordion.Item eventKey={id}>
                        <Accordion.Header>
                            <div style={{ display: 'flex', alignItems: 'center', width: '95%' }}>
                                #{id}
                                <Image src={support.UserPFP} rounded thumbnail style={{ width: "33px", marginRight: '5px', marginLeft: '5px' }} />
                                {support.UserAccountName} : {support.SupportTitle}
                                {
                                    support.SupportResponse === null ?
                                        (<span style={{ color: 'red', marginLeft: '5px' }}>(Not yet responsed)</span>) :
                                        (<span style={{ color: 'green', marginLeft: '5px' }}>(Responsed)</span>)
                                }
                                <div style={{ marginLeft: 'auto' }}>
                                    {support.SupportResponse !== null &&
                                     (<Button variant="info" style={{marginRight:'10px'}}>Edit</Button>)}
                                    <Button variant="danger">Delete</Button>
                                </div>

                            </div>
                        </Accordion.Header>
                        <Accordion.Body>
                            <p>Customer question: {support.SupportRequest}</p>
                            <p>Response : {support.SupportResponse === null ? (<Button variant="primary">Response</Button>) :
                                (<span>{support.SupportResponse}</span>)}</p>
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>

        </div>
    )
}