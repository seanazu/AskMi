import { db } from "firbase.config";
import {
getDoc,
doc,
setDoc,
getDocs,
collection
} from "firebase/firestore";

const getEmployer = async (documentId) =>{
    try{
        const snap = await getDoc(doc(db, "managers", documentId));
        return snap.data();
    } catch(err) {
        console.log(err)
        return "";
    }
}

const getEmployee = (employer, employeeName) =>{
    const worker = employer.employees.map((employee)=>{
        if(employeeName == employee.employeeName){
           return employee
        } else {
            return false
        }
    })
    return worker[0]
}

const pushEmployee = ( employer, employeeName, topic, subTopic, question ) =>{
    const newEmployee = {
        employeeName:employeeName,
        questions:[
            {
                question: question,
                topic: topic,
                subTopic: subTopic,
                createdAt: new Date().getDate()
            }
        ]
    }
    employer.employees.push(newEmployee)
    return employer.employees
}

const pushQuestion = ( employee, question, topic, subTopic ) =>{
    const newQuestion = {
        question: question,
        topic: topic,
        subTopic: subTopic,
        createdAt: new Date().getDate()
    }
    employee.questions.push(newQuestion);
    return employee
}


const addEmployer = ( employee, myName, question, topic, subTopic ) => {
  try {
    setDoc(doc(db, "managers", myName), {
        employees:[
            {
                employeeName:employee,
                questions:[
                    {
                        question: question,
                        topic: topic,
                        subTopic: subTopic,
                        createdAt: new Date().getDate()
                    }
                ]
            }
        ]
    }).then(()=>{
        alert("Worker question inserted into data base")
    }).catch(err =>{
        alert(err)
    });
  } catch (err) {
    console.log(err)
  }
};

const updateEmployer = async ( employees, employerName ) =>{
    const docRef = doc(db, "managers", employerName );
    try {
        setDoc(docRef, {
            employees:employees
        }).then(()=>{
            alert("Worker question inserted into data base")
        }).catch(err =>{
            alert(err)
        });
      } catch (err) {
        console.log(err)
      }
}


const getTopics = async () =>{
    try{
        const topics = [];
        const querySnapshot = await getDocs(collection(db, "topics"));
        querySnapshot.forEach((doc) => {
          topics.push(doc.data().topicName)
        })
        return topics
    }catch (err){
        console.log(err)
    }
} 

const getSubTopics = async (topicName) =>{
    try{
        const snap = await getDoc(doc(db, "topics", topicName));
        return snap.data().subTopics;
    } catch(err) {
        console.log(err)
        return "";
    }
}

const addTopicToDB = (topicName, trimmedTopic) => {
    try {
        setDoc(doc(db, "topics", trimmedTopic), {
            topicName:topicName,
            subTopics:[

            ]
        }).then(()=>{
            alert("New topic added")
        }).catch(err =>{
            alert(err)
        });
      } catch (err) {
        console.log(err)
      }
}

const addSubTopicToDB = async (trimmedTopic, subTopic)=> {
    try{
        const snap = await getDoc(doc(db, "topics", trimmedTopic));
        const newTopicObj = snap.data()
        newTopicObj.subTopics.push(subTopic);
        updateTopic(trimmedTopic, newTopicObj)
    } catch(err) {
        console.log(err)
        return "";
    }
}

const updateTopic = (trimmedTopic, newTopic) =>{
    const docRef = doc(db, "topics", trimmedTopic );
    try {
        setDoc(docRef, newTopic).then(()=>{
            alert("New sub topic added")
        }).catch(err =>{
            alert(err)
        });
      } catch (err) {
        console.log(err)
      }
}


export { addEmployer, pushEmployee, getEmployee, pushQuestion, updateEmployer, getEmployer, addSubTopicToDB, addTopicToDB, getTopics, getSubTopics };