import React, { useState } from 'react'
import { Button, Container, Form, FormLabel, Modal, Row, Table } from 'react-bootstrap'
import Adminsidenav from './Adminsidenav'
import {
    BiBlock,
} from 'react-icons/bi'
import {
    AiFillDelete,
} from 'react-icons/ai'
import {
    RxUpdate,
} from 'react-icons/rx'

import './css/addbook.css'


const styles = {
    container: {
        width: '100%',
    },
    userBody: {
        alignItems: 'center',
        padding: '15px'
    },
    link: {
        marginBottom: '5px',
        marginTop:'40px',
        marginLeft:'90px',
        
    },
    createLink: {
        textDecoration: 'none',
        fontWeight: 'bold',
        fontSize: '22px',
        color: '#712CF9'

    },
    tableData: {

    },
    table: {

    },
    funcLink: {
        textDecoration: 'none',
        color: 'gray',
    },
};

const closeButton={
    justifyContent:'right',
    marginLeft:'50vh',
    border:'none',
    backgroundColor:'white',
    fontSize:'20px',
    marginBottom:'0px',
    color:'grey',
    marginTop:'10px',
}

const Addbook = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <Container>
            <Adminsidenav>
                <Row style={styles.userBody}>
                    <Row style={styles.link}>
                        <a href='#000' style={styles.createLink} onClick={handleShow}>Add book</a>
                        
                        {show&&(<div>
                             <div className='adding'>
                             <div className='addOuter'>
                                    <button onClick={handleClose} style={closeButton}>x</button>
                                     <div style={{ textAlign: 'center', marginBottom: '10px' ,fontSize:'24px',marginTop:'-1px',color:'grey',fontWeight:'bold'}}>
                                         Books
                                     </div>
                                    <div>
                                            <input type="text" placeholder="Name" className='inputField'/><br />
                                            <select className='dropDownOptions'>
                                            <option>Class</option>
                                            <option value="1">One</option>
                                             <option value="2">Two</option>
                                            <option value="3">Three</option>
                                            </select><br />

                                                 <select className='dropDownOptions'>
                                                 <option>Stream</option>
                                                <option value="1">One</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                                </select><br />
                                                <select className='dropDownOptions'>
                                                <option>Publisher</option>
                                                <option value="1">One</option>
                                                <option value="2">Two</option>
                                                 <option value="3">Three</option>
                                                 </select>
                                    </div>
                                    <div >
                                        <Button variant="primary" href="/lessonplan" onClick={handleClose} className='submitBtn'>
                                             Add
                                         </Button>
                                    </div>
                                </div>
                             </div>

                        </div>

                        )}
                    </Row>
                    

                    <div className='userTable'>
                       <div className='userRow'>
                       <div className='userCol1'>
                       <Form.Check
                                    inline
                                    label="1"
                                    name="group1"
                                     type="checkbox"
                                     id={`inline-checkbox-1`}
                            /></div>
                          <div className='userCol2'>
                            <h6>Beehive</h6>
                            <p>Book Name</p>
                          </div>
                          <div className='userCol3'>
                            <h6>Rohit Kumar</h6>
                            <p>User Name</p>
                          </div>
                          <div className='userCol5'>
                              <a href='#0000' style={{ textDecoration: 'none' }}>View</a>
                          </div>
                          <div className='userCol4'>
                          <a href='£0000' style={styles.funcLink}>
                                    <BiBlock />&nbsp;&nbsp;&nbsp;
                                </a>
                                <a href='£0000' style={styles.funcLink}>
                                    <AiFillDelete />
                                </a>
                          </div>
                       </div>
                       <div className='userRow'>
                       <div className='userCol1'>
                       <Form.Check
                                    inline
                                    label="1"
                                    name="group1"
                                     type="checkbox"
                                     id={`inline-checkbox-1`}
                            /></div>
                          <div className='userCol2'>
                            <h6>Beehive</h6>
                            <p>Book Name</p>
                          </div>
                          <div className='userCol3'>
                            <h6>Rohit Kumar</h6>
                            <p>User Name</p>
                          </div>
                          <div className='userCol5'>
                              <a href='#0000' style={{ textDecoration: 'none' }}>View</a>
                          </div>
                          <div className='userCol4'>
                          <a href='£0000' style={styles.funcLink}>
                                    <BiBlock />&nbsp;&nbsp;&nbsp;
                                </a>
                                <a href='£0000' style={styles.funcLink}>
                                    <AiFillDelete />
                                </a>
                          </div>
                       </div>
                       
                       
                    </div>
                </Row>

            </Adminsidenav>
        </Container>
    )
}

export default Addbook