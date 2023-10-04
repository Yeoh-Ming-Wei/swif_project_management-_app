import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { MdStackedLineChart, MdPlayArrow, MdCheck } from "react-icons/md";
import InputDropdown from "./components/InputDropdown";
import InputTextArea from "./components/InputTextArea";
import Popup from 'reactjs-popup';

import ProductBacklog from './ProductBacklog';
import BurndownChart from './BurndownChart';



const SprintBoard = () => {
    const navigate = useNavigate();
    
    const activeSprintName = JSON.parse(localStorage.getItem("activeSprint"));
    const projects = JSON.parse(localStorage.getItem("projects"));
    const activeProjectId = projects.activeProject;
    const activeProject = projects.projects.find((project) => {return project.id == activeProjectId});
    const sprints = activeProject.sprints;
    const activeSprint = sprints.find(
        sprint => {
            // console.log("checking", sprint);
            return sprint.id === activeSprintName;
        }
    );
    const [backlogTasks, setBacklogTasks] = useState(activeSprint.sprintBacklog || []);

    const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks")) || []);
	const [editing, setEditing] = useState(-1); // -1 represents false/not editing
    const [draggedTask, setDraggedTask] = useState(null);

    const [sprintStarted, setSprintStarted] = useState(activeSprint.started);

    const [sprintBoardName, setSprintBoardName] = useState(activeSprintName);
    const [isEditingName, setIsEditingName] = useState(false);
    
    



    const taskTypeSelection = ["User Story", "Bug"];
    const prioritySelection = ["Low", "Medium", "Important", "Urgent"];
    const storyTagSelection = ["Frontend", "Backend", "API", "Framework", "Testing", "UI", "UX", "Database"];
    const storyPointSelection = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
    const userAssignmentSelection = ["Alice", "Ben", "Carol", "Dennis"];
    const taskStageSelection = ["Planning", "Development", "In Progress", "Completed"];


    useEffect(() => {
        const storedName = localStorage.getItem(`sprintBoardName_${activeSprint.id}`);
        if (storedName) {
            setSprintBoardName(storedName);
        } else {
            setSprintBoardName(activeSprintName);
        }
    }, [activeSprint]);




    useEffect(() => {
        let newSprints = sprints;
        const activeSprintIndex = newSprints.indexOf(activeSprint);
        newSprints[activeSprintIndex].sprintBacklog = backlogTasks;

        // Save the changes to localStorage whenever it changes
        // console.log("updating sprints to local storage", newSprints);
        // localStorage.setItem("sprints", JSON.stringify(newSprints));

        let newProjectsList = projects.projects;
        newProjectsList = newProjectsList.filter(
            (project) => { return project.id != activeProjectId; }
        )
        const newProject = {...activeProject,
            sprints: newSprints,
        }
        newProjectsList = newProjectsList.concat(newProject);
        const newProjects = {...projects,
            projects: newProjectsList,
        }
        localStorage.setItem("projects", JSON.stringify(newProjects));
    }, [backlogTasks]);

    useEffect(() => {
        console.log("updating tasks to local storage", tasks);
        localStorage.setItem("tasks", JSON.stringify(tasks)); // convert to string before storing
    }, [tasks]);

    useEffect(() => {
        console.log("updating dragged task to local storage", draggedTask);
        localStorage.setItem("draggedTask", JSON.stringify(draggedTask)); // convert to string before storing
    }, [draggedTask]);

    useEffect(() => {
        let newSprints = sprints;
        const activeSprintIndex = newSprints.indexOf(activeSprint);
        newSprints[activeSprintIndex].started = sprintStarted;

        console.log("updating sprint start status to local storage", sprintStarted);
        // localStorage.setItem("sprints", JSON.stringify(newSprints)); // convert to string before storing
        
        let newProjectsList = projects.projects;
        newProjectsList = newProjectsList.filter(
            (project) => { return project.id != activeProjectId; }
        )
        const newProject = {...activeProject,
            sprints: newSprints,
        }
        newProjectsList = newProjectsList.concat(newProject);
        const newProjects = {...projects,
            projects: newProjectsList,
        }
        localStorage.setItem("projects", JSON.stringify(newProjects));
    }, [sprintStarted]);


    const handleNameChange = (event) => {
        setSprintBoardName(event.target.value);
    }
    
    const handleNameEdit = () => {
        setIsEditingName(true);
    }
    
    const handleNameSave = () => {
        // Here, you might want to save to a server or to localStorage.
        // For simplicity, we're just toggling off the edit mode.
        setIsEditingName(false);
    }




    const EditTask = () => {
        const elementValue = (str) => (document.getElementById(str).value);

		const taskBeingEditedIndex = backlogTasks.findIndex(
			(task) => {
				return(task.id === editing);
			}
		);
		const taskBeingEdit = (taskBeingEditedIndex != -1) ? backlogTasks[taskBeingEditedIndex] : {};
    
        const saveEditedTaskData = () => {
            const calculateElapsedTime = (start, end) => {
                const startDate = new Date(start);
                const endDate = new Date(end);
                const elapsedTimeHours = Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 3600));
                console.log('task elapsed time:',startDate, endDate, elapsedTimeHours);
                return elapsedTimeHours;

            }
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
                startDate: elementValue("taskStartTime"),
                endDate: elementValue("taskEndTime"),
                elapsedTimeHours: calculateElapsedTime(elementValue("taskStartTime"), elementValue("taskEndTime"))
            };
    
            console.log('saving edit to task',newTask);

			// modify tasks and update
			let backlogTasksMutable = backlogTasks.map(x => x); // map does nothing
			backlogTasksMutable[taskBeingEditedIndex] = newTask;
			setBacklogTasks(backlogTasksMutable);
			// stop editing and close popup
			setEditing(-1);
        };
    
        const editTaskForm =
        <div className="edit-task-form">
            <div className="row">
                <div className="edit-task-items">
                    <InputTextArea id = "editName" name="Name" rows="1" value ={taskBeingEdit.name}/>
                    <InputDropdown id = "editTaskType" name="Task Type" selection={taskTypeSelection} value={taskBeingEdit.taskType} />
                    <InputTextArea id = "editDesc" name="Description" value={taskBeingEdit.description}/>
                    <InputDropdown id = "editPriority" name="Priority" selection={prioritySelection} value={taskBeingEdit.priority}/>
                    <InputDropdown id = "editTag" name="User Story Tag" selection={storyTagSelection} value={taskBeingEdit.tag}/>
                    <InputDropdown id = "editStoryPoints" name="Story Points" selection={storyPointSelection} value={taskBeingEdit.storyPoints}/>
                    <InputDropdown id = "editAssignTo" name="Assign To" selection={userAssignmentSelection} value={taskBeingEdit.member}/>
                    <InputDropdown id = "editTaskStage" name="Task Stage" selection={taskStageSelection} value={taskBeingEdit.taskStage}/>
                    Task Start Time <input id = "taskStartTime" type = "datetime-local" defaultValue={taskBeingEdit.startDate}/><br/>
                    Task End Time <input id = "taskEndTime" type = "datetime-local" defaultValue={taskBeingEdit.endDate}/><br/>
                    Accumulated Time (Hours): {taskBeingEdit.elapsedTimeHours}<br/>
                    <button type="button" className="btn btn-primary" onClick={() => saveEditedTaskData()}>Save</button>
                </div>
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

    const dragTask = (event, task) => {
        // event.preventDefault();
        console.log('PB dragging');
        const currentDragged = JSON.parse(localStorage.getItem("draggedTask"));
        console.log(currentDragged);
        setDraggedTask(task);
    }

    const dragEnd = (event) => {
        console.log('**SB drag END');
        setDraggedTask(null);
    }


    const createCardElement = (t) => {
        const Card = ({id, title, taskStage, priority, storyPoints, editFunction, deleteFunction, onDragFunction}) => {

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
                <div id={id} className={"card"} draggable="true" onDrag = {onDragFunction} onDragEnd = {dragEnd} style={{width: '18rem', height: '10rem', margin: "10px", padding: "10px", backgroundColor: bgColours(priority), color: "black", borderRadius: "16px"}}>
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
        return <Card 
            id = {"card" + t.id}
            title = {t.name} taskStage={taskStageSelection[t.taskStage]} 
            priority ={prioritySelection[t.priority]} 
            storyPoints = {storyPointSelection[parseInt(t.storyPoints)]}
            key = {t.id}
            editFunction ={() => setEditing(t.id)}
            deleteFunction = {() => {
                setBacklogTasks(backlogTasks.filter(tfilter => tfilter.id != t.id))
            }}
            onDragFunction = {(event) => {dragTask(event, t)}}
        />
    }

    const sprintBacklog = () => {
        const onDragOver = (e) => {
            e.stopPropagation();
            e.preventDefault();
        };

        const moveToSprintBacklog = (e, newTaskStage) => {
            // console.log(e);
            const draggedTask = JSON.parse(localStorage.getItem("draggedTask"));
            setDraggedTask(null);
            console.log("dropped", draggedTask);
            if (backlogTasks.filter(
                (task) => {
                    return task.id === draggedTask.id
                }
            ).length > 0) {
                console.log("duplicate task dropped, changing task stage instead", draggedTask);
                const newTask = {...draggedTask,
                    taskStage: newTaskStage
                }
                let newBacklogTasks = backlogTasks.map(x => x); // map does nothing
                newBacklogTasks = newBacklogTasks.filter(
                    (task) => {
                        return (task.id != draggedTask.id);
                    }
                )
                newBacklogTasks = newBacklogTasks.concat(newTask);
                // console.log('test', newBacklogTasks[draggedTask])
                console.log('new backlog', newBacklogTasks)
                setBacklogTasks(newBacklogTasks);
                return;
            }

            if (sprintStarted !== false) {
                console.log("attempting to move task to sprint backlog when sprint is already started!", draggedTask);
                alert("You cannot move tasks into a sprint once it has already started!");
                return;
            }

            console.log("moving task to sprint backlog", newTaskStage, draggedTask);
            const newTask = {...draggedTask,
                taskStage: newTaskStage
            }
            setBacklogTasks(backlogTasks.concat(newTask));
            setTasks(tasks.filter(
                (task) => {
                    return (task.id != newTask.id);
                }
            ))
            // setDraggedTask(null);
            window.location.reload() // needed to update product backlog component
        };

        return (<>
            <h2>Sprint Backlog</h2>
            <div onDragOver={onDragOver}>
                {backlogTasks.length != 0 ? <></> : <h3>No tasks in the sprint backlog! Drag and drop a task from the Product Backlog here!</h3>}
                <div style={{display:"flex", flexDirection:"row", justifyContent:"center", }}>
                    <div width={"400px"} onDrop={(event) => {moveToSprintBacklog(event, "0")}} style={{border:"2px solid grey"}}>
                        <div style={{width:"300px"}}/>
                        <h2>Not started</h2>
                        {backlogTasks.filter((task) => {
                            return (task.taskStage !== "2" && task.taskStage !== "3")}
                        ).map(t => createCardElement(t))}
                    </div>
                    {/* <div style={{borderLeft:"4px solid grey", height:"500px"}}>
                    </div> */}
                    <div onDrop={(event) => {moveToSprintBacklog(event, "2")}} style={{border:"2px solid grey"}}>
                        <div style={{width:"300px"}}/>
                        <h2>In Progress</h2>
                        {backlogTasks.filter((task) => {
                            return task.taskStage == "2"
                        }).map(t => createCardElement(t))}
                    </div>
                    {/* <div style={{borderLeft:"4px solid grey", height:"500px"}}></div> */}
                    <div onDrop={(event) => {moveToSprintBacklog(event, "3")}} style={{border:"2px solid grey"}}>
                        <div style={{width:"300px"}}/>
                        <h2>Completed</h2>
                        {backlogTasks.filter((task) => {
                            return task.taskStage == "3"
                        }).map(t => createCardElement(t))}
                    </div>  
                </div>
            </div>
        </>);
    }
    
    const sprintControls = () => {
        const finishSprint = () => {
            const newSprints = sprints.filter(
                (sprint) => {
                    return (sprint.id != activeSprint.id)
                }
            )
            // localStorage.setItem("sprints", JSON.stringify(newSprints));
            
            let newProjectsList = projects.projects;
            newProjectsList = newProjectsList.filter(
                (project) => { return project.id != activeProjectId; }
            )
            const newProject = {...activeProject,
                sprints: newSprints,
            }
            newProjectsList = newProjectsList.concat(newProject);
            const newProjects = {...projects,
                projects: newProjectsList,
            }
            localStorage.setItem("projects", JSON.stringify(newProjects));
            setTimeout(() => {         // delay navigation very slightly, to allow code above to take effect (hacky solution)
                navigate("/sprints"); // return to sprints view
            }, 1);
        }
        return (
        <div>
            <div>
                <h4>
                    Start Date: {new Date (activeSprint.startDate).toUTCString()}
                    <br/>
                    End Date: {new Date (activeSprint.endDate).toUTCString()}
                </h4>
            </div>
            <button type = "button" className="button" onClick = {() => setSprintStarted(true)} >
                <div><MdPlayArrow size={32} /></div>
                <div>Start Sprint</div>
            </button>
            {/* <form>
                <input type = "datetime-local" id = "sprintStartTime"></input>
            </form> */}
            
            <button type = "button" className ="button" onClick = {finishSprint} >
                <div><MdCheck size={32} /></div>
                <div>Finish Sprint</div>
            </button>

            <button type = "button" className ="button" onClick = {() => {navigate("/burndown_chart")}} >
                <div><MdStackedLineChart size={32} /></div>
                <div>View Burndown Chart</div>
            </button>
        </div>
        )
    }

    return (<>
        {/* {backlogTasks} */}
        <div>
    {isEditingName ? (
        <>
            <input 
                type="text" 
                //value={sprintBoardName} 
                onChange={handleNameChange}
                onBlur={handleNameSave} 
                placeholder="Enter new sprint board name..."
                autoFocus
            />
        </>
        ) : (
        <h1 onClick={handleNameEdit}>{sprintBoardName}</h1>
        )}
        </div>
        {sprintControls()}
        {/* <BurndownChart /> */}
        {sprintBacklog()}
        <EditTask />
        <ProductBacklog /> 
    </>);
};

export default SprintBoard;