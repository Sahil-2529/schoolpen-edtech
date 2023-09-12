                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                import React, { useState } from 'react'
import { Button, ButtonGroup, ButtonToolbar, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import Usersidebar from './Usersidebar';
import './css/lessonplan.css';
import {addLesson} from '../api/auth';
import { useLocation } from 'react-router-dom';



const Lessonplan = () => {



    const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const bookName = searchParams.get('bookName');


    const [activeButtonIndex, setActiveButtonIndex] = useState(0);
    const [activeButton, setActiveButton] = useState('Informative');
    const [activeQButton,setActiveQButton]=useState(0);
    const [selectedQuestionType, setSelectedQuestionType] = useState(''); // State to track the selected question type
    const[selectedAnswerType,setSelectedAnswerType]=useState('');
    const [optionsDisabled, setOptionsDisabled] = useState(false);
    const [isCorrectAnswer, setIsCorrectAnswer] = useState(null);
    const [savedAnswer,setSavedAnswer]=useState(null);
    


    const handleIsCorrectAnswerChange = (event) => {
        setIsCorrectAnswer(event.target.value);

        // console.log("yuppp",savedAnswer==="option1");
        setOptionsDisabled(event.target.value != 'NO');
        // if(event.target.value=='NO'){
        //     //setSavedAnswer(null);
            
        // }
        // if(event.target.value==="YES"){
        //     console.log(savedAnswer);


        // }

      };
    
      const handleOptionChange = (event) => {
        // console.log("answer is ",event.target.value);
        //  setSavedAnswer(event.target.value);
         setOptionsDisabled(true);
         
        if(isCorrectAnswer==="NO"){
            setSavedAnswer(event.target.value);
        }
        
      };
    

    const handleAnwerType=(event)=>{
        setSelectedAnswerType(event.target.value);
    }
    
    const handleQuestionTypeChange = (event) => {
        setSelectedQuestionType(event.target.value); // Update the selected question type when the first dropdown changes
    };


    const handleButtonClick = (index) => {
        setActiveButtonIndex(index);
      };
      const handleQCLick=(index)=>{
        setActiveQButton(index)
      }

      const handleButtonActiveClick = (buttonType) => {
        setActiveButton(buttonType);
        
      };
    const [serviceList, setServiceList] = useState([{ service: '' },
    { service: '' },
    { service: '' },
    ]);

    const handleServiceAdd = () => {
        setServiceList([...serviceList, { service: '' }])
    }

    const options = [
        { value: '1', label: 'One' },
        { value: '2', label: 'Two' },
        { value: '3', label: 'Three' },
        { value: '4', label: 'Four' },
        { value: '5', label: 'Five' },
        // Add more options as needed
      ];
      
    const [serviceQList, setServiceQList] = useState([{ qservice: '' },
    { qservice: '' },
    { qservice: '' },
    ]);

    const handleServiceQAdd = () => {
        setServiceQList([...serviceQList, { qservice: '' }])
    }

    
    const handleAddLesson = async () => {
        try {
          const newLessonData = {
            // Your lesson data here...
          };
          const response = await addLesson(newLessonData);
          console.log('New lesson added:', response.data);
          // Handle success or error response...
        } catch (error) {
          console.error('Error adding lesson:', error);
          // Handle error...
        }
      };

    return (
        <Container>
            <div className='lesson-wrapper'>
            <Usersidebar>
                <Form >
                <div className='lessonTable' >
                    <div className='lessonRow1'>
                        <div className='r1c'>RBSE</div>
                        <div className='r1c'>9th</div>
                        <div className='r1c'>10th</div>
                        {bookName &&(<div className='r1c'>{bookName}</div>)}
                    </div>
                    <div className='lessonRow2'>
                    {
                                    serviceList.map((singleService, index) => (
                                        <div key={index} className='services'>
                                            <div className='second-div'>
                                                <button type='button' className={`days ${activeButtonIndex === index ? 'active' : ''}`} onClick={() => handleButtonClick(index)}>
                                                    <span>Day {index + 1}</span>  
                                                </button>
                                            </div>
                                           {serviceList.length-1==index && <div className='first-div'>
                                                {
                                                    serviceList.length - 1 === index &&
                                                    serviceList.length < 15 &&
                                                    (
                                                        <button type='button' className='add-btn'
                                                            onClick={handleServiceAdd}
                                                        >
                                                            <span>+</span>
                                                        </button>
                                                    )
                                                }
                                            </div>}
                                        </div>
                                    ))
                                }
                    </div>
                    <div className='box2'>
                    <div className='lessonRow3'>
                        <div className='r3c'>
                        <InputGroup className="mb-3">
                        <textarea rows={1} style={{ resize: 'none' }} placeholder="Add title"className="txtDetail" />
                            </InputGroup>
                        </div>
                        <div  className='r3c'><InputGroup className="mb-3">
                                <textarea rows={1} style={{ resize: 'none' }} placeholder="Objective"className="txtDetail" />
                            </InputGroup>

                        </div>
                    </div>
                    <div className='lessonRow4'>
                        <textarea
                            className='custom-textarea'
                            rows={3}
                            placeholder='Content'/>
                            <Button
                                className='content_btn'>+</Button>
                    </div>
                    <div className='lessonRow5'>
                        <div className='r5c'>
                        <InputGroup className="mb-5">
                        <textarea rows={1} style={{ resize: 'none' }} placeholder="Add title" />
                            </InputGroup>
                        </div>
                        <div  className='r5c'><InputGroup className="mb-5">
                        <textarea rows={1} style={{ resize: 'none' }} placeholder="Relevance to text" />
                            </InputGroup>

                        </div>
                        <div className='r5c'>
                        <InputGroup className="mb-5">
                        <textarea rows={1} style={{ resize: 'none' }} placeholder="Skill gained" />
                            </InputGroup>
                        </div>
                    </div>
                    <div className='lessonRow5'>
                        <div className='r5c'>
                        <InputGroup className="mb-5">
                        <textarea rows={1} style={{ resize: 'none' }} placeholder="Events" />
                            </InputGroup>
                        </div>
                        <div  className='r5c'><InputGroup className="mb-5">
                        <textarea rows={1} style={{ resize: 'none' }} placeholder="Problems" />
                            </InputGroup>

                        </div>
                        <div className='r5c'>
                        <InputGroup className="mb-5">
                        <textarea rows={1} style={{ resize: 'none' }} placeholder="Career path" />
                            </InputGroup>
                        </div>
                    </div>

                    </div>
                    <div className='box2'>
                         <div className='b2row1'>
                             
                              <div className='row1c'>
                              <Button
                                variant={activeButton === 'Informative' ? 'primary' : 'outline-primary'}
                                onClick={() => handleButtonActiveClick('Informative')}
                                
                                className='mb-2'>Informative</Button>
                              </div>
                              <div className='row1c'>
                              <Button
                               variant={activeButton === 'Conceptual' ? 'primary' : 'outline-primary'}
                               OnClick={() => handleButtonActiveClick('Conceptual')}
                                className='mb-2'>Conceptual</Button>
                              </div>
                              <div className='row1c'>
                              <Button
                                variant={activeButton === 'Conceptual' ? 'primary' : 'outline-primary'}
                               OnClick={() => handleButtonActiveClick('Colearning')}
                                
                                className='mb-2'>Colearning</Button>
                              </div>
                              
                         </div>
                         <div className='b2row2'>
                                        {
                                            serviceQList.map((singleService, index) => (
                                            <div key={index} className='services'>
                                                <div className='second-div'>
                                                    <button type='button' className={`days ${activeQButton === index ? 'active' : ''}`} onClick={() => handleQCLick(index)} >
                                                        <span>Q {index + 1}</span>
                                                    </button>
                                                </div>
                                           {serviceList.length-1==index && <div className='first-div'>
                                                {
                                                    serviceList.length - 1 === index &&
                                                    serviceList.length < 15 &&
                                                    (
                                                        <button type='button' className='add-btn'
                                                            onClick={handleServiceQAdd}
                                                        >
                                                            <span>+</span>
                                                        </button>
                                                    )
                                                }
                                            </div>}
                                        </div>
                                    ))
                                }
                            </div>
                            <div className='b2row3'>
                                  <div className='row3c'>
                                  <Form.Select aria-label="Default select example" id="option"   style={{outline:'none'}} className='form custom-dropdown' onChange={handleQuestionTypeChange}>
                                        
                                        <option>Question type</option>
                                        <option  className="optins"value="text">Text</option>
                                        <option value="mcq">MCQ</option>
                                        
                                    </Form.Select>
                                  </div>
                                 {selectedQuestionType==="text" &&( <div className='row3c'>
                                  <Form.Select aria-label="Default select example" className='form custom-dropdown' onChange={handleAnwerType}>
                                        <option>Answer type</option>
                                
                                        <option value="para">Paragraph</option>
                                        <option value="fillup">Fill Ups</option>
                                        <option value="onesentence">One Sentence</option>
                                    </Form.Select>
                                  </div>)}
                                  
                            </div>
                           { selectedQuestionType==="text"&& (<div className='b2row4'>
                            <Form.Control type="text" placeholder="Write question" className='writetxt' />
                            </div>)}

                           {selectedQuestionType==="text" && selectedAnswerType==="para"&& (<div className='b2row5'>
                                <textarea
                                className='textarea'
                                rows={3} /* Adjust the number of rows as needed */
                            
                                placeholder='Answer text type'/>
                            </div>)}
                            {selectedQuestionType==="text" &&  selectedAnswerType==="onesentence"&& (<div className='b2row5'>
                                <textarea
                                className='textarea'
                                rows={1} /* Adjust the number of rows as needed */
                            
                                placeholder='Answer text type'/>
                            </div>)}
                            {selectedQuestionType==="text" && selectedAnswerType=="fillup"&&(
                                <div className='b2row4'>
                            <Form.Control type="text" placeholder="Answer" className='filluptxt' />
                            </div>)}
                            {selectedQuestionType=="mcq" &&(
                            <div className='b2row6'>
                                 <div className='row6left'>
                                    <h5>Options : </h5>
                                 </div>
                                 <div className='row6right'>
                                 <div className="mb-3">
                                        <div className='row6rightcol'>
                                        <input type="radio" name="group1" id="inline-radio-1" className="custom-radio-input"  value="option1"onChange={handleOptionChange} disabled={optionsDisabled} />
                                        <label htmlFor="inline-radio-1" className="custom-radio-label">option 1</label>
                                        </div>
                                        <div className='row6rightcol'>
                                        <input type="radio" name="group1" id="inline-radio-2" className="custom-radio-input"   value="option2"onChange={handleOptionChange} disabled={optionsDisabled}/>
                                        <label htmlFor="inline-radio-2" className="custom-radio-label">
                                           option 2
                                        </label>
                                    </div>
                                    <div className='row6rightcol'>
                                        <input
                                        type="radio"
                                        name="group1"
                                        id="inline-radio-3"
                                        className="custom-radio-input"  value="option3"onChange={handleOptionChange} disabled={optionsDisabled}
                                        />
                                    <label htmlFor="inline-radio-3" className="custom-radio-label">
                                    option 3
                                    </label>
                                    </div>
                                    <div className='row6rightcol'>
                                     <input type="radio" name="group1" id="inline-radio-4" className="custom-radio-input"   value="option4" onChange={handleOptionChange} disabled={optionsDisabled}/>
                                    <label htmlFor="inline-radio-4" className="custom-radio-label">option 4
                                    </label>
                                    </div>
                                    </div>
                                 </div>
                            </div>)}
                            {selectedQuestionType==='mcq'&&(
                            <div className='b2row7'>
                                <div className='row7left'>
                                      <h5>Answer Is Correct ?</h5>
                                </div>
                                <div className='row7right'>
                                     <div className='row7rightcol'>
                                     <input type="radio" name="group1" id="inline-radio-4" className="custom-radio-input" value="YES"onChange={handleIsCorrectAnswerChange}  />
                                    <label htmlFor="inline-radio-4" className="custom-radio-label">YES</label>
                                    </div>
                                    <div className='row7rightcol'>
                                     <input type="radio" name="group1" id="inline-radio-4" className="custom-radio-input" value="NO"onChange={handleIsCorrectAnswerChange} />
                                    <label htmlFor="inline-radio-4" className="custom-radio-label">NO
                                    </label>
                                    </div>
                                </div>
                            </div>)}
                            {selectedQuestionType=="mcq"&& (
                            <div className='b2row8'>
                                <div className='row8left'>
                                      <h5>Answer type blanks : </h5>
                                </div>
                                <div className='row8right'>
                                    <div className='row8rightcol'>
                                     <input type="text" name="group1" id="inline-radio-4" className="customInput" />
                                    </div>
                                </div>
                            </div>)}
                            <div className='b2row9'>
                                 <div className='row9c'>
                                     <button className='next-button'>Next</button>
                                 </div>
                                 <div className='row9c'>
                                 <button className='finishbutton'>Finish</button>
                                 </div>
                            </div>

                    </div>
                    <div className='row10'> 
                        <button className='complete'>Complete</button>
                    </div>

                </div>


                </Form>

            </Usersidebar></div>
        </Container>

    )
}

export default Lessonplan