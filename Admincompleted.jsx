import React, { useState } from 'react'
import { Button, Container, Form, FormLabel, Modal, Row, Table } from 'react-bootstrap'
import Adminsidenav from './Adminsidenav'
import {
    BiBlock,
} from 'react-icons/bi'
import {
    AiFillDelete,
} from 'react-icons/ai';
import { Link } from 'react-router-dom';
import "./css/createuser.css"

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
        marginTop:'10vh',
        marginLeft:'15vh',
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

const Admincompleted = () => {
    return (

        <Container>
            <Adminsidenav>
            <div style={styles.link}>
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
                          <Link to="/lessonplan" style={{ textDecoration: 'none' }}>
      View
    </Link>
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
                          <Link to="/lessonplan" style={{ textDecoration: 'none' }}>
      View
    </Link>
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
                    </div>
            </Adminsidenav>
        </Container>

    )
}

export default Admincompleted