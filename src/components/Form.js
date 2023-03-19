import React, { useEffect, useRef, useState } from 'react';

// Styled Components
import { Option, SubjectDropdown } from '@/styledComp/Dropdowns';
import { HeaderText } from '@/styledComp/Headers';
import { ButtonContainer, DropDownContainer, FromContainer, HeaderContainer, InputContainer, ModalBodyContainer } from '@/styledComp/Containers';
import { TextBoxInput, TextInput } from '@/styledComp/Inputs';
import { Label } from '@/styledComp/Texts';

// Firebase
import { addEmployer, pushEmployee, getEmployee, getEmployer, pushQuestion, updateEmployer, addTopicToDB, addSubTopicToDB, getTopics, getSubTopics } from '@/assets/firebaseFunctions';
 
export default function Form() {
    const[selected, setSelected] = useState(false);
    const[topics, setTopics] = useState([]);
    const[subTopics, setSubTopics] = useState([]);
    const[newTopic, setNewTopic] = useState("");
    const[newSubTopic, setNewSubTopic] = useState("");
    const[subTopicModal, setSubTopicModal] = useState(false);
    const[employeeName, setEmployeeName] = useState("");
    const[employerName, setEmployerName] = useState("");
    const[question, setQuestion] = useState("");
    const[topic, setTopic] = useState("");
    const[subTopic, setSubTopic] = useState("");

    const employeeRef = useRef(null);
    const employerRef = useRef(null);
    const questionRef = useRef(null);
    const topicRef = useRef(null);
    const subTopicRef = useRef(null);
    const newTopicRef = useRef(null);
    const closeButtonRef = useRef(null);

    useEffect(() => {
      fetchData()
    },[])
    
    const fetchData = async () =>{
      const topics = await getTopics()
      setTopics(topics);
      const defaultSubTopics = await getSubTopics(topics[0]);
      setSubTopics(defaultSubTopics)
    }

    const submit = async (e) =>{
      e.preventDefault()
      let missingData = false
      if(!employeeName){
        employeeRef.current.style.borderColor = 'red';
        missingData = true
      }
      if(!employerName){
        employerRef.current.style.borderColor = 'red';
        missingData = true
      }
      if(!question){
        questionRef.current.style.borderColor = 'red';
        missingData = true
      }
      if(!selected || topic === "Add"){
        topicRef.current.style.borderColor = 'red';
        missingData = true
      }
      if(!subTopic && selected || subTopic === "Add"){
        subTopicRef.current.style.borderColor = 'red';
        missingData = true
        alert('Add sub topic to new topic');
        return;
      }
      if(missingData){
        alert("Fill form in order to submit")
        return;
      }


      try{
        const employerTrimmedName = employerName.replace(/\s+/g, '');
        const employer = await getEmployer(employerTrimmedName);

        if(employer){
          let newEmployeesArr = [];
          const employee = getEmployee(employer, employeeName)

          if(employee){
            const newEmployeeObj = pushQuestion(employee, question, topic, subTopic)

            newEmployeesArr = employer.employees.map((employee) =>{
              if(employee.name == employeeName){
                return newEmployeeObj
              } else {
                return employee
              }
            })

          }else {
            newEmployeesArr = pushEmployee(employer, employeeName, topic, subTopic, question);
          }
          updateEmployer(newEmployeesArr, employerTrimmedName);

        }else {
          addEmployer(employeeName, employerTrimmedName, question, topic, subTopic);
        }
      } catch (err){
        console.log(err)
      }
    }  

    const showSubTopic = () => {
      topicRef.current.style.borderColor = 'black';
      setSelected(true)
    }


    const changeSubTopic = async (e) =>{
        setTopic(e.target.value)
        let subTopics ;
        subTopics = await getSubTopics(e.target.value);
        setSubTopics(subTopics);
    }
    

    const addTopic = () =>{
      if(!subTopicModal){
        if(!newTopic){
          newTopicRef.current.style.borderColor = 'red';
          alert("Add topic");
          return;
        }
        setTopics([...topics,newTopic])
        console.log(newTopic)
        setTopic(newTopic)
        addTopicToDB(newTopic, newTopic)
        closeButtonRef.current.click()
      } else {
        addSubTopic()
        closeButtonRef.current.click()
      }
    } 

    const addSubTopic = () =>{
      if(!newSubTopic){
        newTopicRef.current.style.borderColor = 'red';
        alert("Add sub topic");
        return;
      }
      setSubTopics([...subTopics,newSubTopic])
      setSubTopic(newSubTopic)
      addSubTopicToDB(topic,newSubTopic)
    }

    let topicsOptions = "" ;
    if(topics[0]){
      topicsOptions = topics.map((topic, index)=>{
        return <Option key={index}>{topic}</Option>
      })
    }
    
    let subTopicsOptions = "" ;
    if(subTopics[0]){
        subTopicsOptions = subTopics.map((topic, index)=>{
          return <Option key={index}>{topic}</Option>
        })
    }

  return (
    <FromContainer>

        <HeaderContainer>
          <HeaderText>Question Form</HeaderText>
        </HeaderContainer>
      
        <form className="mb-10 d-flex flex-column align-items-center" >

          <InputContainer className="mb-3">
            <Label className="form-label">My name</Label>
            <TextInput ref={employerRef} type="text" className="form-control" onChange={(e)=>{
                setEmployerName(e.target.value)
                employerRef.current.style.borderColor = 'black';
              }} />
          </InputContainer>

          <InputContainer className="mb-3">
            <Label className="form-label">Employee name</Label>
            <TextInput ref={employeeRef} type="text" className="form-control" onChange={(e)=>{
                setEmployeeName(e.target.value)
                employeeRef.current.style.borderColor = 'black';
              }} />
          </InputContainer>

          <InputContainer className="mb-3">
            <Label className="form-label">Question</Label>
            <TextBoxInput ref={questionRef} type="text" className="form-control" onChange={(e)=>{
                setQuestion(e.target.value)
                questionRef.current.style.borderColor = 'black';
              }} />
          </InputContainer>


          <div className="form-group mb-4 ">

            <Label>Topic</Label>

            <DropDownContainer>
              <SubjectDropdown ref={topicRef} onClick={(e)=>{
                  showSubTopic()
                  changeSubTopic(e)
                }} 
                onChange={changeSubTopic} 
                value={topic}
                id="exampleFormControlSelect1">
                {topicsOptions}
              </SubjectDropdown>
            </DropDownContainer>

            <ButtonContainer>
              <button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>setSubTopicModal(false)}>
                Add topic <i className="bi bi-plus-circle"></i>
              </button>
            </ButtonContainer>

          </div>

          { selected ?
            <div className="form-group mb-4 ">

              <label> {topic} - Sub Topic</label>

              <DropDownContainer >
                <SubjectDropdown ref={subTopicRef} onClick={(e)=>setSubTopic(e.target.value)}  id="exampleFormControlSelect2" >
                  { subTopicsOptions[0] ?
                    subTopicsOptions :
                    <option>Add</option>
                  }
                </SubjectDropdown>
              </DropDownContainer>

              <ButtonContainer>
                <button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>setSubTopicModal(true)}>
                  Add sub topic <i className="bi bi-plus-circle"></i>
                </button>
              </ButtonContainer>

            </div>
            :
            <></>

          }

          <button onClick={submit} className="btn btn-primary mt-4">Submit</button>


          <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">

                  <ModalBodyContainer>
                    <InputContainer className="mb-3">
                      <label className="form-label">
                        {subTopicModal ? "New Sub Topic" : "New Topic"}
                      </label>
                      <TextInput ref={newTopicRef} type="text" className="form-control" onChange={(e)=>{
                        if(!subTopicModal){
                          setNewTopic(e.target.value)
                          newTopicRef.current.style.borderColor = 'black';
                        } else{
                          setNewSubTopic(e.target.value)
                        }

                        }} />
                    </InputContainer>
                  </ModalBodyContainer>

                </div>
                <div className="modal-footer">
                  <button ref={closeButtonRef} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-primary" ata-bs-dismiss="modal" onClick={addTopic}>Add</button>
                </div>
              </div>
            </div>
          </div>
        </form>
    </FromContainer>
  )
}
