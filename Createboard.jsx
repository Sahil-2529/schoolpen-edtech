import React, { useState } from 'react'
import { Button, Container, Form, FormLabel, Modal, Row, Table } from 'react-bootstrap'
import Adminsidenav from './Adminsidenav'
import {
    BiBlock,
} from 'react-icons/bi'
import {
    AiFillDelete,
} from 'react-icons/ai'

import './css/createuser.css';

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
    
    funcLink: {
        textDecoration: 'none',
        color: 'gray',
    },
};

const modalBorder={
    borderBottom:'none',
    borderTop:'none',
}

const submitBtn={
    marginLeft:'18vh',
    padding:'1vh 8vh',
    borderRadius:'5vh',
    marginBottom:'10px',
    backgroundColor:' #8546e3',
    borderColor:' #8546e3',
    marginTop:'7px'
}
const inputField={
    width:'60%',
    marginLeft:'90px',
    borderRadius:'30vh',
    paddingLeft:'20px',
    marginTop:'25px',
    marginBottom:'20px',
    boxShadow: '0 0 5px #ccc',
    outline: 'none',

}

const addOuter={
    borderRadius:'10vh',
    backgroundColor:"white",
    width:'60vh',
    padding:'10px 3px 40px 5px',
   
}
const adding={
    position: 'fixed',
     top: 0,
    left: 0,
     width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}
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

const Createboard = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <Container>
            <Adminsidenav>
                <Row style={styles.userBody}>
                    <Row style={styles.link}>
                        <a href='#000' style={styles.createLink} onClick={handleShow}>Create Board</a>
                        
                        {show && (<div style={adding}>
                            <div style={addOuter}>
                            
                                <div style={modalBorder}>
                                    <button style={closeButton} onClick={handleClose}> X</button>
                                     <div style={{ textAlign: 'center', marginBottom: '10px' ,fontSize:'24px',marginTop:'-1px'}}>
                                         Board
                                     </div>
                                    <div style={modalBorder}>
                                        <Form.Control type="text" placeholder="Board Name" style={inputField} />
                                    </div>
                                    <div style={modalBorder}>
                                        <Button variant="primary" href="/lessonplan" onClick={handleClose} style={submitBtn}>
                                             Create
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
                            <h6>RBSE</h6>
                            <p>Board Name</p>
                          </div>
                          <div className='userCol3'>
                            <h6>87244556671</h6>
                            <p>Board Id</p>
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
                            <h6>CBSE</h6>
                            <p>Board Name</p>
                          </div>
                          <div className='userCol3'>
                            <h6>87244556671</h6>
                            <p>Board Id</p>
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
                            <h6>RBSE</h6>
                            <p>Board Name</p>
                          </div>
                          <div className='userCol3'>
                            <h6>87244556671</h6>
                            <p>Board Id</p>
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

export default Createboard