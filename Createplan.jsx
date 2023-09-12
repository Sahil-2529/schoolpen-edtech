import React, { useState } from 'react'
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap'
import Usersidebar from './Usersidebar'
import { useNavigate } from 'react-router-dom';


const Createplan = () => {
    const [board, setBoard] = useState('');
    const [classValue, setClassValue] = useState('');
    const [stream, setStream] = useState('');
    const [publisher, setPublisher] = useState('');
    const [show, setShow] = useState(false);
    const isAllFieldsSelected = board && classValue && stream && publisher;
    const navigate = useNavigate();

    
    

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [bookName, setBookName] = useState('');

    const handleBookNameChange = (event) => {
        setBookName(event.target.value); 
      };

      const handleAdd = () => {
        handleClose();
        navigate(`/lessonplan?bookName=${encodeURIComponent(bookName)}`);
      };

    const body = {
        // background: 'lightgray',
        
        alignItems: 'center',
        justifyContent: 'center',
        // padding: '10px 10px',
        display: 'flex',
        
    }

    const addbook = {
        display: 'flex',
        
        width:'auto',
        marginLeft:'7vh',
        marginTop:'8vh'
        
    }
    const eachColumn={
        padding:'1.5vh',
        width:'20vh',
       border:'1px solid #949494',
       paddingLeft:'3vh',
       borderRadius:'10vh',
        color:'grey',
        fontSize:'12px',
        fontWeight:'bold'

    }
    const eachColumnFocus={
        outline:'none',
        border: '1px solid grey', /* Add a border to show focus */
        boxShadow:' 0 0 0 0px grey'
    
    }
    
    const modalBorder={
        borderBottom:'none',
        borderTop:'none',
    }
    const btn = {
        width: '20vh',
        padding:'1vh 2vh',
        borderRadius:'4vh',
        backgroundColor:'#8546e3',
        border:' #8546e3'
    }
    const submitBtn={
        marginLeft:'20vh',
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
        fontSize:'30px',
        marginBottom:'0px',
        marginTop:'10px',
   }
    return (
        <Container style={body} className='add_book'>
            <Usersidebar>

                <Row style={addbook}>
                    <Col >
                        <Form.Select className='custom-dropdown form' style={eachColumn} aria-label="Default select example" required value={board} onChange={(e) => setBoard(e.target.value)}>
                            <option>Board</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                            
                        </Form.Select>
                    </Col>
                    <Col >
                        <Form.Select style={eachColumn} className='custom-dropdown form' aria-label="Default select example" value={classValue} onChange={(e) => setClassValue(e.target.value)}>
                            <option>Class</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                    </Col>
                    <Col >
                        <Form.Select style={eachColumn} className='custom-dropdown form' aria-label="Default select example" value={stream} onChange={(e) => setStream(e.target.value)}>
                            <option>Stream</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                            
                        </Form.Select>
                    </Col>
                    <Col >
                        <Form.Select style={eachColumn} className='custom-dropdown form'  aria-label="Default select example" value={publisher} onChange={(e) => setPublisher(e.target.value)}>
                            <option>Publisher</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                    </Col>
                    <Col >
                        <Button variant="primary" onClick={handleShow}  disabled={!isAllFieldsSelected} style={btn}>Add book</Button>
                         
                        {show && (<div style={adding}>
                            <div style={addOuter}>
                            
                                <div style={modalBorder}>
                                    <button style={closeButton} onClick={handleClose}> X</button>
                                     <div style={{ textAlign: 'center', marginBottom: '6px' ,fontSize:'24px',marginTop:'-1px'}}>
                                         Book
                                     </div>
                                    <div style={modalBorder}>
                                        <Form.Control type="text" placeholder="Book Name" style={inputField} value={bookName} onChange={handleBookNameChange}/>
                                    </div>
                                    <div style={modalBorder}>
                                        <Button variant="primary" onClick={handleAdd}   style={submitBtn}>
                                             Add
                                         </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        )}
                    </Col>
                </Row>

            </Usersidebar>
        </Container>

    )
}

export default Createplan