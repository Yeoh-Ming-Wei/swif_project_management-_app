import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { MdStackedLineChart, MdPlayArrow, MdCheck } from "react-icons/md";
import FunctionalButton from './components/buttons/functionalbutton';
import EditDateForm from './components/EditDateForm';
import Card from './components/Card';
import Popup from 'reactjs-popup';


const SprintBoard = () => {
    const navigate = useNavigate();

    const p = JSON.parse(localStorage.getItem("projects"))
    const activeP = p.projects.filter(project => project.id == p.activeProject)[0]
    let activeSprint = activeP.sprints.filter(sprint => sprint.id == p.activeSprint)[0]

    const [draggedTask, setDraggedTask] = useState(null);
    const [task, setTask] = useState(activeP.tasks);
    const [sprint, setSprint] = useState(activeSprint);
    const [editing, setEditing] = useState(-1);
    
    const activeAccount = JSON.parse(localStorage.getItem("activeAccount"));
    
    useEffect(() => {
        activeP.sprints = activeP.sprints.map(s => {
                if (s.id == activeSprint.id) {
                    s = sprint
                }
                return s
            })
        
        p.projects.map(project => {
            if (project.id == activeP.id){
                project = activeP
            }
            return project
        })
        localStorage.setItem("projects", JSON.stringify(p)); // convert to string before storing
        
    }, [sprint])

    useEffect(() => {
       activeP.tasks = task
        p.projects.map(project => {
            if (project.id == activeP.id){
                project = activeP
            }
            return project
        })
        localStorage.setItem("projects", JSON.stringify(p)); // convert to string before storing
        
    }, [task])

    useEffect(() => {
        console.log("updating dragged task to local storage", draggedTask);
        localStorage.setItem("draggedTask", JSON.stringify(draggedTask)); // convert to string before storing
    }, [draggedTask]);


    const dragTask = (event, task) => {
        console.log('PB dragging');
        const currentDragged = JSON.parse(localStorage.getItem("draggedTask"));
        console.log(currentDragged);
        setDraggedTask(task);
    }

    const dragEnd = (event) => {
        console.log('**SB drag END');
        setDraggedTask(null);
    }

    const manageTask = (id) => {
        const elementValue = (str) => (document.getElementById(str).value);
        const updateTask = task.map(t => {
            if (t.id == id) {
                t.startDate = elementValue("taskStartTime")
                t.endDate = elementValue("taskEndTime")
                t.member = activeAccount
                console.log(id)
            }
            console.log(id)
            return t
        })
        
        setTask(updateTask)
        setEditing(-1)
    }

    const EditTaskDate = () => {

        const editTaskPopup = () => {
        const closeModal = () => setEditing(-1);
        return (
            <div>
                <Popup open={(editing != -1)} closeOnDocumentClick onClose={closeModal}>
                    <div className="modal">
                        <a className="close" onClick={closeModal}>&times;</a>
                        
                    </div>
                    <EditDateForm task = {task.filter(t => t.id == editing)[0]} buttonFunc = {() => manageTask(editing)}/>
                </Popup>
            </div>
        );
        };
    
        return editTaskPopup();  
    }


    const sprintBacklog = () => {
        const onDragOver = (e) => {
            e.stopPropagation();
            e.preventDefault();
        };

        const moveToSprintBacklog = (e, newTaskStage) => {
    
            const draggedTask = JSON.parse(localStorage.getItem("draggedTask"));
            setDraggedTask(null);
            console.log("dropped", draggedTask);

            if (sprint.status === "Not Started") {
                alert("You can't move tasks when the sprint is not started!");
                return 
            }

            console.log("moving task to sprint backlog", newTaskStage, draggedTask);
            const updateTask = task.map(t => {
                if (t.id == draggedTask.id) {
                    t.taskStage = newTaskStage
                    t.startDate = null
                    t.endDate = null
                }
                return t
            })
            setTask(updateTask)
            window.location.reload() // needed to update product backlog component
        };



        return (<>
            <h2>Sprint Backlog</h2>
            <div onDragOver={onDragOver}>
                {sprint.sprintBacklog.length != 0 ? <></> : <h3>No tasks in the sprint backlog! Drag and drop a task from the Product Backlog here!</h3>}
                <div style={{display:"flex", flexDirection:"row", justifyContent:"center", }}>
                    <div width={"400px"} onDrop={(event) => {moveToSprintBacklog(event, 0)}} style={{border:"2px solid grey"}}>
                        <div style={{width:"300px"}}/>
                        <h2>Not started</h2>
                        {activeP.tasks.filter(t => sprint.sprintBacklog.includes(t.id) && t.taskStage == 0)
                            .map(t => <Card task = {t} key = {t.id} onDrag = {(event) => {dragTask(event, t)}} onDragEnd = {dragEnd}/>)}
                    </div>
                    
                    <div onDrop={(event) => {moveToSprintBacklog(event, 2)}} style={{border:"2px solid grey"}}>
                        <div style={{width:"300px"}}/>
                        <h2>In Progress</h2>
                        {activeP.tasks.filter(t => sprint.sprintBacklog.includes(t.id) && t.taskStage == 2)
                        .map(t => <Card task = {t} key = {t.id} onDrag = {(event) => {dragTask(event, t)}} onDragEnd = {dragEnd} editFunction={() => setEditing(t.id)}/>)}
                    </div>
                    
                    <div onDrop={(event) => {moveToSprintBacklog(event, 3)}} style={{border:"2px solid grey"}}>
                        <div style={{width:"300px"}}/>
                        <h2>Completed</h2>
                        {activeP.tasks.filter(t => sprint.sprintBacklog.includes(t.id) && t.taskStage == 3)
                        .map(t => <Card task = {t} key = {t.id} onDrag = {(event) => {dragTask(event, t)}} onDragEnd = {dragEnd}/>)}
                    </div>  
                </div>
            </div>
        </>);
    }

    const finishSprint = () => {
        if (sprint.status === "Not Started") {
            alert("You can't complete sprint without starting it yet!");
            return 
        }

        if (sprint.status === "In Progress") {
            setSprint({...sprint, 
                status: "Completed", 
                started: false
            })
            alert("Sprint has been completed!");
            setTimeout(() => {         // delay navigation very slightly, to allow code above to take effect (hacky solution)
                navigate("/sprints"); // return to sprints view
            }, 1);
            return 
        }

        if (sprint.status === "Completed") {
            alert("You already ended the sprint before!");
            setTimeout(() => {         
                navigate("/sprints"); 
            }, 1);
        }
    }
    
    return (<>
        <div>
        <h1>Sprint Board</h1>
        <FunctionalButton text = "Back to Sprint Manager" func = {() => navigate("/sprint_manager")}/>
        <FunctionalButton text = "Show burndown chart" func = {() => navigate("/burndown_chart")}/>
        <FunctionalButton text = "Complete Sprint" func = {() => finishSprint()}/>
        <EditTaskDate />
        </div>
        {sprintBacklog()}
    </>);
};

export default SprintBoard;