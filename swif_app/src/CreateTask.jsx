import { useState } from 'react';
import ReactDOM from 'react-dom/client';

import InputDropdown from "./components/InputDropdown";
import InputList from "./components/InputList";
import InputTextArea from "./components/InputTextArea";

import { MdFolder, MdAddBox } from "react-icons/md";
import Popup from 'reactjs-popup';


const taskTypeSelection = ["User Story", "Bug"];
const prioritySelection = ["Low", "Medium", "Important", "Urgent"];
const storyTagSelection = ["Frontend", "Backend", "API", "Framework", "Testing", "UI", "UX", "Database"];
const storyPointSelection = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
const taskStageSelection = ["Planning", "Development", "In Progress", "Completed"];

let taskID = 0;
const elementValue = (str) => (document.getElementById(str).value);

const collectData = () => {
    const task = {
        id: taskID,
        name: elementValue("Name"),
        tasktype: elementValue("Task Type"),
        description: elementValue("Description"),
        priority: elementValue("Priority"),
        tag: elementValue("User Story Tag"),
        storypoint: elementValue("Story Point"),
        member: elementValue("Assign To"),
        taskstage: elementValue("Task Stage"),
    };

    console.log('saving task',task);

    const newState = JSON.parse(localStorage.getItem("state"));
    localStorage.setItem("state", JSON.stringify(newState))
    // increment ID
    taskID++;
};



// function CreateTaskForm() {
//     const [inputs, setInputs] = useState({});
  
//     const handleChange = (event) => {
//         const name = event.target.name;
//         const value = event.target.value;
//         setInputs(values => ({...values, [name]: value}))
//     }
  
//     const handleSubmit = (event) => {
//         event.preventDefault();
//         alert(inputs);
//         console.log(event)
//     }
  
//     return (
//         <form onSubmit={handleSubmit}>
//             <label>Enter your name:
//             <input 
//                 type="text" 
//                 name="username" 
//                 value={inputs.username || ""} 
//                 onChange={handleChange}
//             />
//             </label>
//             <br></br>
//             <textarea rows="5" cols="33">
//             </textarea>
//             <label>Enter your age:
//                 <input 
//                         type="number" 
//                         name="age" 
//                         value={inputs.age || ""} 
//                         onChange={handleChange}
//                 />
//                 </label>
//                 <input type="submit" />
//         </form>
//     )
// }
const CreateTask = () => {
    const createTaskForm =
    <>
        <div className="create-task-form">
            <div className="row">
                <div className="col"></div>

                <div className="create-task-items">
                    <InputTextArea name="Name" rows="1"/>
                    <InputDropdown name="Task Type" selection={taskTypeSelection} />
                    <InputTextArea name="Description" />
                    <InputDropdown name="Priority" selection={prioritySelection} />
                    <InputDropdown name="User Story Tag" selection={storyTagSelection} />
                    <InputDropdown name="Story Point" selection={storyPointSelection} />
                    <InputDropdown name="Assign To" selection={[]} />
                    <InputDropdown name="Task Stage" selection={taskStageSelection} />

                    {/* <button type="button" className="btn btn-primary me-md-2">Cancel</button> */}
                    <button type="button" className="btn btn-primary" onClick={collectData}>Save</button>
                </div>
                <div className="col"></div>
            </div>
        </div>
    </>

    const [open, setOpen] = useState(false);

    const createTaskPopup = () => {
        const closeModal = () => setOpen(false);
        return (
            <div display={"flex"} flex-direction={"row"}>
                <button type="button" className="button" onClick={() => setOpen(o => !o)} >
                    <div><MdAddBox size={36} /></div>
                    <div>Create New Task</div>
                </button>
                <Popup open={open} closeOnDocumentClick onClose={closeModal}>
                    <div className="modal">
                        <a className="close" onClick={closeModal}>&times;</a>
                        {createTaskForm}
                    </div>
                </Popup>
            </div>
        );
    };

    return (
        <>
            {createTaskPopup()}
        </>
    );
};
export default CreateTask;