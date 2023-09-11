import { useState, useEffect } from 'react';
import InputDropdown from "./components/InputDropdown";
import InputTextArea from "./components/InputTextArea";

import { MdAddBox } from "react-icons/md";
import Popup from 'reactjs-popup';

const ProductBacklog = () => {
    const defaultName = 'Product Backlog';
    const storedName = localStorage.getItem('productName');
    
    const [productName, setProductName] = useState(storedName || defaultName);
    const [editingName, setEditingName] = useState(false);
    const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks")) || []);

    useEffect(() => {
        // Save the product name to localStorage whenever it changes
        localStorage.setItem('productName', productName);
    }, [productName]);

    useEffect(() => {
        console.log("updating tasks to local storage", tasks);
        localStorage.setItem("tasks", JSON.stringify(tasks)); // convert to string before storing
    }, [tasks]);

    const taskElements = tasks.map(
        (task) => {
            return(
                <div>{JSON.stringify(task)}</div>
            )
        }
    )

    const TaskView = () => {
        return(
            <>
                {taskElements}
            </>
        )
    }

    const CreateTask = () => {
        const taskTypeSelection = ["User Story", "Bug"];
        const prioritySelection = ["Low", "Medium", "Important", "Urgent"];
        const storyTagSelection = ["Frontend", "Backend", "API", "Framework", "Testing", "UI", "UX", "Database"];
        const storyPointSelection = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
        const taskStageSelection = ["Planning", "Development", "In Progress", "Completed"];
    
        let taskID = 0;
        const elementValue = (str) => (document.getElementById(str).value);
    
    
        const collectData = () => {
            const newTask = {
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
    
            console.log('saving task',newTask);
            // update state with new task
            setTasks(tasks.concat(newTask));
            // increment ID
            taskID++;
        };
    
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
        </>
    )
};

export default ProductBacklog;