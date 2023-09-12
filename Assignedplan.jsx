import React from 'react'
import Usersidebar from './Usersidebar'
import { Container, Form, FormLabel, Table } from 'react-bootstrap'
import { BiColumns } from 'react-icons/bi';

const styles={
  table: {
    display:'flex',
    flexWrap:'wrap',
    paddingright:'2px',
    borderColapse:'separate',
    marginTop:'10vh',
    marginLeft:'15px',
    paddingBottom:'2px'
},
rows:{
   
    marginLeft:'90px',
    display:'flex',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.3)',
    borderRadius:'26px',
    marginTop:'6vh'
},
column:{
    marginLeft:'20px',
    marginTop:'5px'
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
    marginTop:'4px',
    color:'blue',
    textDecoration:'none'
},
}

const Assignedplan = () => {

  const checkHover = (event) => {
    if (event.type === 'mouseenter') {
      event.target.style.backgroundColor = '#8546e3';
    } else if (event.type === 'mouseleave') {
      event.target.style.backgroundColor = 'transparent';
    }
  };
  return (
    <Container>
      <Usersidebar>
        
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
                                <h6 style={{fontSize:'15px',marginBottom:'-2px',marginTop:'6px',fontStyle:'bold'}}>Beehive</h6>
                                <p style={{fontSize:'10px'}}>Book name</p>

                                </div>
                                <div className='col3' style={styles.col3}>
                                <a href='##' style={{textDecoration:'none'}}>Start</a>
                            </div>
                  </div>

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
                                <h6 style={{fontSize:'15px',marginBottom:'-2px',marginTop:'6px',fontStyle:'bold'}}>Beehive</h6>
                                <p style={{fontSize:'10px'}}>Book name</p>

                                </div>
                                <div className='col3' style={styles.col3}>
                                <a href='##' style={{textDecoration:'none'}}>Start</a>
                            </div>
                  </div>

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
                                <h6 style={{fontSize:'15px',marginBottom:'-2px',marginTop:'6px',fontStyle:'bold'}}>Beehive</h6>
                                <p style={{fontSize:'10px'}}>Book name</p>

                                </div>
                                <div className='col3' style={styles.col3}>
                                <a href='##' style={{textDecoration:'none'}}>Start</a>
                            </div>
                  </div>

        </div>
      </Usersidebar>
    </Container>

  )
}

export default Assignedplan