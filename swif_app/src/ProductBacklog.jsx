import { useState, useEffect } from 'react';
import InputDropdown from "./components/InputDropdown";
import InputTextArea from "./components/InputTextArea";

import { MdAddBox } from "react-icons/md";
import Popup from 'reactjs-popup';

// let taskID = 0;

const ProductBacklog = () => {
    const defaultName = 'Product Backlog';
    const storedName = localStorage.getItem('productName');
    
    const [productName, setProductName] = useState(storedName || defaultName);
    const [editingName, setEditingName] = useState(false);
	const [taskId, setTaskId] = useState(JSON.parse(localStorage.getItem("taskId")) || 0);
    const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks")) || []);
	const [editing, setEditing] = useState(-1); // -1 represents false/not editing
    const [sort, setSort] = useState(0);
    const [filter, setFilter] = useState([]);

    const taskTypeSelection = ["User Story", "Bug"];
    const prioritySelection = ["Low", "Medium", "Important", "Urgent"];
    const storyTagSelection = ["Frontend", "Backend", "API", "Framework", "Testing", "UI", "UX", "Database"];
    const storyPointSelection = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
    const userAssignmentSelection = ["Alice", "Ben", "Carol", "Dennis"];
    const taskStageSelection = ["Planning", "Development", "In Progress", "Completed"];
   

	useEffect(() => {
        // Save the task id to localStorage whenever it changes
        localStorage.setItem('taskId', taskId);
    }, [taskId]);

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

    const CreateTask = () => {
        const elementValue = (str) => (document.getElementById(str).value);
    
        const saveTaskData = () => {
            const newTask = {
                id: taskId,
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
			// increment ID
            setTaskId(taskId + 1)
        };
    
        const createTaskForm =
        <div className="create-task-form">
            <div className="row">
            <div className="col"></div>

            <div className="create-task-items">
			<InputTextArea id = "editName" name="Name" rows="1"/>
				{/* default to user story */}
                <InputDropdown id = "editTaskType" name="Task Type" selection={taskTypeSelection} value={0}/>
                <InputTextArea id = "editDesc" name="Description"/>
                <InputDropdown id = "editPriority" name="Priority" selection={prioritySelection}/>
                <InputDropdown id = "editTag" name="User Story Tag" selection={storyTagSelection}/>
                <InputDropdown id = "editStoryPoints" name="Story Points" selection={storyPointSelection}/>
                <InputDropdown id = "editAssignTo" name="Assign To" selection={userAssignmentSelection}/>
                <InputDropdown id = "editTaskStage" name="Task Stage" selection={taskStageSelection}/>
                <button type="button" className="btn btn-primary" onClick={() => saveTaskData()}>Save</button>
            </div>
            <div className="col"></div>
            </div>
        </div>

    
        const [open, setOpen] = useState(false);
    
        const createTaskPopup = () => {
            const closeModal = () => setOpen(false);
            return (
                <div>
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

	const EditTask = () => {
        const elementValue = (str) => (document.getElementById(str).value);

		const taskBeingEditedIndex = tasks.findIndex(
			(task) => {
				return(task.id === editing);
			}
		);
		const taskBeingEdit = (taskBeingEditedIndex != -1) ? tasks[taskBeingEditedIndex] : {};
    
        const saveEditedTaskData = () => {
            const newTask = {
				// id: taskID,
                id: parseInt(taskBeingEdit.id),
                name: elementValue("Name"),
                taskType: elementValue("Task Type"),
                description: elementValue("Description"),
                priority: elementValue("Priority"),
                tag: elementValue("User Story Tag"),
                storyPoints: elementValue("Story Points"),
                member: elementValue("Assign To"),
                taskStage: elementValue("Task Stage"),
            };
    
            console.log('saving edit to task',newTask);

			
			// modify tasks and update
			let tasksMutable = tasks.map(x => x); // map does nothing
			tasksMutable[taskBeingEditedIndex] = newTask;
			setTasks(tasksMutable);
			// stop editing and close popup
			setEditing(-1);
        };
    
        const editTaskForm =
        <div className="edit-task-form">
            <div className="row">
            <div className="col"></div>

            <div className="edit-task-items">
                <InputTextArea id = "editName" name="Name" rows="1" value ={taskBeingEdit.name}/>
                <InputDropdown id = "editTaskType" name="Task Type" selection={taskTypeSelection} value={taskBeingEdit.taskType} />
                <InputTextArea id = "editDesc" name="Description" value={taskBeingEdit.description}/>
                <InputDropdown id = "editPriority" name="Priority" selection={prioritySelection} value={taskBeingEdit.priority}/>
                <InputDropdown id = "editTag" name="User Story Tag" selection={storyTagSelection} value={taskBeingEdit.tag}/>
                <InputDropdown id = "editStoryPoints" name="Story Points" selection={storyPointSelection} value={taskBeingEdit.storyPoints}/>
                <InputDropdown id = "editAssignTo" name="Assign To" selection={userAssignmentSelection} value={taskBeingEdit.member}/>
                <InputDropdown id = "editTaskStage" name="Task Stage" selection={taskStageSelection} value={taskBeingEdit.taskStage}/>

                <button type="button" className="btn btn-primary" onClick={() => saveEditedTaskData()}>Save</button>
            </div>
            <div className="col"></div>
            </div>
        </div>

        const editTaskPopup = () => {
            const closeModal = () => setEditing(-1);
            return (
                <div>
                    <Popup open={(editing != -1)} closeOnDocumentClick onClose={closeModal}>
                        <div className="modal">
                            <a className="close" onClick={closeModal}>&times;</a>
                            {editTaskForm}
                        </div>
                    </Popup>
                </div>
            );
        };
    
        return editTaskPopup();  
    };


    const Card = ({id, title, taskStage, priority, storyPoints, editFunction, deleteFunction}) => {

        const bgColours = (priority) => {
          switch(priority) {
            case "Urgent": 
            	return "Salmon"
            case "Important":
            	return "Khaki"
            case "Medium": 
            	return "PaleGreen"
            case "Low": 
            	return "White"
            default: 
            	return "Gray"
          }
        }
    
        return (
			<div id={id} className={"card"}  style={{width: '18rem', height: '10rem', margin: "10px", padding: "10px", backgroundColor: bgColours(priority), color: "black", borderRadius: "16px"}}>
				<div className="card-body" style={{display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
				<h3 className="card-title" align="left">{title}</h3>
				
				<div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
					<p className="card-text" align="left">{taskStage}</p>
					<h3 className="card-text" align="right">{storyPoints}</h3>
				</div>
				<div style={{display:"flex", flexDirection:"row", justifyContent:"end"}}>
					<button onClick={editFunction}>Edit</button>
					<button onClick={deleteFunction}>Delete</button>
					
				</div>
				
				</div>
				
			</div>
        )
    }
    return (
        <>
            <h1>{productName}</h1>
			<div>
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
			</div>
		
            <hr />
			<CreateTask />
			<EditTask />
            {tasks.length != 0 ? <div style={{display:"flex", flexDirection:"row", justifyContent:"center", }}>
				<p> Sort By: </p>
				<button type="button" className="btn btn-primary mb-3 me-1" onClick={() => {
					const sorted = tasks.toSorted((a, b) => parseInt(b.priority) - parseInt(a.priority))
					setTasks(sorted)
					setSort(1)
				}}>Priority</button>
				
				<button type="button" className="btn btn-primary mb-3 me-5" onClick={() => {
					const sorted = tasks.toSorted((a, b) => a.id - b.id)
					setTasks(sorted)
					setSort(0)
				}}>Date</button>

				<p> Order by: </p>
				<button type="button" className="btn btn-secondary mb-3 me-1" onClick={() => {
					const sorted = (sort == 1 ? tasks.toSorted((a, b) => parseInt(b.priority) - parseInt(a.priority)) : tasks.toSorted((a, b) => a.id - b.id))
					setTasks(sorted)
				}}>↑</button>

				<button type="button" className="btn btn-secondary mb-3 me-1" onClick={() => {
					const sorted = (sort == 1 ? tasks.toSorted((a, b) => parseInt(a.priority) - parseInt(b.priority)) : tasks.toSorted((a, b) => b.id - a.id))
					setTasks(sorted)
				}}>↓</button>
            </div> : <></>}
			<div style={{display:"flex", flexDirection:"row", justifyContent:"center"}}>
                {tasks.length != 0 ? (
                <>
                    <p> Filter By: {filter.map(tag => tag + " ")} </p>
                    {storyTagSelection.map((tag) => <button type="button" className="btn btn-primary mb-3 me-1" key="" onClick= {() => {
                        !filter.includes(tag) ? setFilter(filter.concat(tag)) : setFilter(filter.filter(tagFilter => tagFilter != tag))
                      
                    }}>{tag}</button>)}

                </>   
                ) : (<></>)}
			</div>
              
			{tasks.filter(tFilter => filter.length == 0 || filter.includes(storyTagSelection[tFilter.tag])).map(t => (    
				<>
					<Card 
						id = {"card" + t.id}
						title = {t.name} taskStage={taskStageSelection[t.taskStage]} 
						priority={prioritySelection[t.priority]} 
						storyPoints= {storyPointSelection[parseInt(t.storyPoints)]}
						key = {t.id}
						editFunction={() => setEditing(t.id)}
						deleteFunction={() => setTasks(tasks.filter(tfilter => tfilter.id != t.id))}
					/>
				</>
            ))}
        </>
    )
};

export default ProductBacklog;