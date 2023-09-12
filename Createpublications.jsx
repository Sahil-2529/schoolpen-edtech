import React, { useState } from 'react'
import { Button, Col, Container, Form, FormLabel, Modal, Row, Table } from 'react-bootstrap'
import Adminsidenav from './Adminsidenav'
import {
    BiBlock,
} from 'react-icons/bi'
import {
    AiFillDelete,
} from 'react-icons/ai'

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
        display: 'flex',
        padding: '25px'
    },
    table: {
        display:'flex',
        flexWrap:'wrap',
        paddingright:'2px',
        borderColapse:'separate',
        marginTop:'10px',
        marginLeft:'15px',
        paddingBottom:'2px'
    },
    rows:{
       
        marginLeft:'90px',
        display:'flex',
        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.3)',
        borderRadius:'26px',
        marginTop:'4vh'
    },
    column:{
        marginLeft:'20px',
        marginTop:'4px'
    },
    col2:{
        marginLeft:'5vh',
        marginTop:'-3px',
        marginRight:'7vh',
        fontSize:'15px',
        textAlign:'left',
        marginBottom:'2px',
        
        width:'150px'
    },
    col3:{
        marginRight:'3vh',
        marginTop:'4px'
    },
    funcLink: {
        textDecoration: 'none',
        color: 'gray',
    },
    colCenter: {
        textAlign: 'center',
        justifyContent: 'center',
    }
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
    marginTop:'10px',
    color:'grey'
}



const Createpublications = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <Container>
            <Adminsidenav>
                <Row style={styles.userBody}>
                    <Row style={styles.link}>
                        <a href='#000' style={styles.createLink} onClick={handleShow}>Create</a>
                    

                        {show && (<div style={adding}>
                            <div style={addOuter}>
                            
                                <div style={modalBorder}>
                                    <button style={closeButton} onClick={handleClose}>x</button>
                                     <div style={{ textAlign: 'center', marginBottom: '4px' ,fontSize:'24px',marginTop:'-2px'}}>
                                         Publication
                                     </div>
                                    <div style={modalBorder}>
                                        <Form.Control type="text" placeholder="Name" style={inputField} />
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
                    <div style={styles.table}>
                        <div className='rows' style={styles.rows }>
                            <div className='col' style={styles.column}>
                            <Form.Check
                                    inline
                                    label="1"
                                    name="group1"
                                     type="checkbox"
                                     id={`inline-checkbox-1`}
                            />
                            </div>
                            <div className='col' style={styles.col2}>
                                <h6 style={{fontSize:'15px',marginBottom:'-2px',marginTop:'6px',fontStyle:'bold'}}>NCERT</h6>
                                <p style={{fontSize:'10px'}}>Publication</p>

                                </div>
                                <div className='col3' style={styles.col3}>
                                <a href='£0000' style={styles.funcLink}>
                                    <BiBlock />&nbsp;&nbsp;&nbsp;
                                </a>
                                <a href='£0000' style={styles.funcLink}>
                                    <AiFillDelete />
                                </a>
                            </div>

                        </div>
                        
                        <div className='rows' style={styles.rows}>
                        <div className='col' style={styles.column}>
                            <Form.Check
                                    inline
                                    label="1"
                                    name="group1"
                                     type="checkbox"
                                     id={`inline-checkbox-1`}
                            />
                            </div>
                            <div className='col' style={styles.col2}>
                            <h6 style={{fontSize:'15px',marginBottom:'-2px',marginTop:'6px',fontStyle:'bold'}}>NCERT</h6>
                                <p style={{fontSize:'10px'}}>Publication</p>
                                </div>
                                <div className='col3' style={styles.col3}>
                                <a href='£0000' style={styles.funcLink}>
                                    <BiBlock />&nbsp;&nbsp;&nbsp;
                                </a>
                                <a href='£0000' style={styles.funcLink}>
                                    <AiFillDelete />
                                </a>
                            </div>
                        </div>
                        <div className='rows' style={styles.rows}>
                        <div className='col' style={styles.column}>
                            <Form.Check
                                    inline
                                    label="1"
                                    name="group1"
                                     type="checkbox"
                                     id={`inline-checkbox-1`}
                            />
                            </div>
                            <div className='col' style={styles.col2}>
                            <h6 style={{fontSize:'15px',marginBottom:'-2px',marginTop:'6px',fontStyle:'bold'}}>NCERT</h6>
                                <p style={{fontSize:'10px'}}>Publication</p>
                                </div>
                                <div className='col3' style={styles.col3}>
                                <a href='£0000' style={styles.funcLink}>
                                    <BiBlock />&nbsp;&nbsp;&nbsp;
                                </a>
                                <a href='£0000' style={styles.funcLink}>
                                    <AiFillDelete />
                                </a>
                            </div>
                        </div>
                        <div className='rows' style={styles.rows}>
                        <div className='col' style={styles.column}>
                            <Form.Check
                                    inline
                                    label="1"
                                    name="group1"
                                     type="checkbox"
                                     id={`inline-checkbox-1`}
                            />
                            </div>
                            <div className='col' style={styles.col2}>
                            <h6 style={{fontSize:'15px',marginBottom:'-2px',marginTop:'6px',fontStyle:'bold'}}>NCERT</h6>
                                <p style={{fontSize:'10px'}}>Publication</p>
                                </div>
                                <div className='col3' style={styles.col3}>
                                <a href='£0000' style={styles.funcLink}>
                                    <BiBlock />&nbsp;&nbsp;&nbsp;
                                </a>
                                <a href='£0000' style={styles.funcLink}>
                                    <AiFillDelete />
                                </a>
                            </div>
                        </div>

                        <div className='rows' style={styles.rows}>
                        <div className='col' style={styles.column}>
                            <Form.Check
                                    inline
                                    label="1"
                                    name="group1"
                                     type="checkbox"
                                     id={`inline-checkbox-1`}
                            />
                            </div>
                            <div className='col' style={styles.col2}>
                            <h6 style={{fontSize:'15px',marginBottom:'-2px',marginTop:'6px',fontStyle:'bold'}}>NCERT</h6>
                                <p style={{fontSize:'10px'}}>Publication</p>
                                </div>
                                <div className='col3' style={styles.col3}>
                                <a href='£0000' style={styles.funcLink}>
                                    <BiBlock />&nbsp;&nbsp;&nbsp;
                                </a>
                                <a href='£0000' style={styles.funcLink}>
                                    <AiFillDelete />
                                </a>
                            </div>
                        </div>
                        <div className='rows' style={styles.rows}>
                        <div className='col' style={styles.column}>
                            <Form.Check
                                    inline
                                    label="1"
                                    name="group1"
                                     type="checkbox"
                                     id={`inline-checkbox-1`}
                            />
                            </div>
                            <div className='col' style={styles.col2}>
                            <h6 style={{fontSize:'15px',marginBottom:'-2px',marginTop:'6px',fontStyle:'bold'}}>NCERT</h6>
                                <p style={{fontSize:'10px'}}>Publication</p>
                                </div>
                                <div className='col3' style={styles.col3}>
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

export default Createpublications