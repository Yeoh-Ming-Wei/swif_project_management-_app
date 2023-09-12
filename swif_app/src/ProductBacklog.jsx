import { useState, useEffect } from 'react';
import InputDropdown from "./components/InputDropdown";
import InputTextArea from "./components/InputTextArea";

import { MdAddBox } from "react-icons/md";
import Popup from 'reactjs-popup';

let taskID = 0;

const ProductBacklog = () => {
    const defaultName = 'Product Backlog';
    const storedName = localStorage.getItem('productName');
    
    const [productName, setProductName] = useState(storedName || defaultName);
    const [editingName, setEditingName] = useState(false);
    const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks")) || []);

    const taskTypeSelection = ["User Story", "Bug"];
    const prioritySelection = ["Low", "Medium", "Important", "Urgent"];
    const storyTagSelection = ["Frontend", "Backend", "API", "Framework", "Testing", "UI", "UX", "Database"];
    const storyPointSelection = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
    const taskStageSelection = ["Planning", "Development", "In Progress", "Completed"];
   

    useEffect(() => {
        // Save the product name to localStorage whenever it changes
        localStorage.setItem('productName', productName);
    }, [productName]);

    useEffect(() => {
        console.log("updating tasks to local storage", tasks);
        localStorage.setItem("tasks", JSON.stringify(tasks)); // convert to string before storing
    }, [tasks]);

    const taskElements = tasks.map(
        (task) => <div key="">{JSON.stringify(task)}</div>  
    )

    const TaskView = () => taskElements

    const CreateTask = () => {
        const elementValue = (str) => (document.getElementById(str).value);
    
        const collectData = () => {
            const newTask = {
                id: taskID,
                name: elementValue("Name"),
                taskType: elementValue("Task Type"),
                description: elementValue("Description"),
                priority: elementValue("Priority"),
                tag: elementValue("User Story Tag"),
                storyPoints: elementValue("Story Points"),
                member: elementValue("Assign To"),
                taskStage: elementValue("Task Stage"),
            };
    
            console.log('saving task',newTask);
            // update state with new task
            setTasks(tasks.concat(newTask));
            taskID++
        };
    
        const createTaskForm =
        <div className="create-task-form">
            <div className="row">
            <div className="col"></div>

            <div className="create-task-items">
                <InputTextArea name="Name" rows="1"/>
                <InputDropdown name="Task Type" selection={taskTypeSelection} />
                <InputTextArea name="Description" />
                <InputDropdown name="Priority" selection={prioritySelection} />
                <InputDropdown name="User Story Tag" selection={storyTagSelection} />
                <InputDropdown name="Story Points" selection={storyPointSelection} />
                <InputDropdown name="Assign To" selection={[]} />
                <InputDropdown name="Task Stage" selection={taskStageSelection} />

                {/* <button type="button" className="btn btn-primary me-md-2">Cancel</button> */}
                <button type="button" className="btn btn-primary" onClick={() => collectData()}>Save</button>
            </div>
            <div className="col"></div>
            </div>
        </div>

    
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
    
        return createTaskPopup();  
    };

    const Card = ({id, title, taskStage, priority, storyPoints, editFunction, deleteFunction}) => {

        const bgColours = (priority) => {
          switch(priority) {
            case "Urgent": 
              return "red"
            case "Important":
              return "yellow"
            case "Medium": 
              return "yellowgreen"
            case "Low": 
              return "lightgreen"
            default: 
              return "darkgrey"
          }
        }
    
        const textColours = (priority) => {
          switch(priority) {
            case "Urgent": 
              return "white"
            case "Important":
              return "black"
            case "Medium": 
              return "black"
            case "Low": 
              return "black"
            default: 
              return "white"
          }
        }
    
        return (
          <div id={id} className={"card"}  style={{width: '18rem', height: '10rem', margin: "10px", backgroundColor: bgColours(priority), color: textColours(priority), borderRadius: "20px"}}>
            <div className="card-body">
              <h3 className="card-title" align="left">{title}</h3>
              
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                <h3 className="card-text" align="left">{taskStage}</h3>
                <h3 className="card-text" align="right">{storyPoints}</h3>
              </div>
              <div style={{display:"flex", flexDirection:"row", justifyContent:"end"}}>
                <button>Edit</button>
                <button onClick={deleteFunction}>Delete</button>
                
              </div>
              
            </div>
            
          </div>
        )
    }
    return (
        <>
            <h1>{productName}</h1>
            <TaskView />
            <CreateTask />
            {editingName ? 
                <div>
                    <input 
                        type="text" 
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        style={{ fontSize: '1em', padding: '10px', width: '300px' }}  // Adjust these styles as desired
                    />
                    <button onClick={() => setEditingName(false)}>Confirm</button>
                </div>
            :
                <button onClick={() => setEditingName(true)}>Change Backlog Name</button>
            }
            <hr />
            {tasks.map(t => (    
                <>
                    <Card 
                        id = {"card" + t.id}
                        title = {t.name} taskStage={taskStageSelection[t.taskStage]} 
                        priority={prioritySelection[t.priority]} 
                        storyPoints= {storyPointSelection[parseInt(t.storyPoints)]}
                        key = {t.id}
                        deleteFunction={() => setTasks(tasks.filter(tfilter => tfilter.id != t.id))}
                    />
                </>
            ))}
        </>
    )
};

export default ProductBacklog;