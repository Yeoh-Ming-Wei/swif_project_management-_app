import FunctionalButton from "./components/buttons/functionalbutton";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from 'react';

import Card from "./components/Card";

const SprintManager = () => {

    const p = JSON.parse(localStorage.getItem("projects"))
    const activeP = p.projects.filter(project => project.id == p.activeProject)[0]
    const activeSprint = activeP.sprints.filter(sprint => sprint.id == p.activeSprint)[0]

    const restoreSprint = () => {
        return(activeSprint)
    }

    const [task, setTask] = useState(activeP.tasks)
    const [sprint, setSprint] = useState(restoreSprint())
    const [draggedTask, setDraggedTask] = useState(null);

    const navigate = useNavigate()

    useEffect(() => {
        localStorage.setItem("draggedTask", JSON.stringify(draggedTask)); // convert to string before storing
    }, [draggedTask]);

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


    const dragTask = (event, task) => {
        setDraggedTask(task);
    }

    const dragEnd = (event) => {
        console.log('**SB drag END');
        setDraggedTask(null);
    }

    const onDragOver = (e) => {
        e.stopPropagation();
        e.preventDefault();
    };

    const dragSprintEvent = (event, n) => {
        // parameter n : n = 0 -> Product to Sprint, n = 1 -> Sprint to Product
        setDraggedTask(null);

        if (sprint.status === "In Progress") {
            alert("You cannot move tasks into a sprint once it has already started!");
            return
        }

        if (n == 0) {

            setSprint({...sprint, 
                sprintBacklog: sprint.sprintBacklog.concat(draggedTask.id)})
            setTask(task.map( t => {
                if (t.id == draggedTask.id) {
                    t.taskStage = 0
                }
                return t
            }))
            
        }
        if (n == 1) {
            setSprint({...sprint, 
                sprintBacklog: sprint.sprintBacklog.filter(t => t != draggedTask.id)})
            
        }
        window.location.reload() // needed to update product backlog component
    }

    const startSprint = () => {
        if (sprint.sprintBacklog.length == 0) {
            alert("There is no task inside sprint backlog!")
            return
        }
    
        if (sprint.status === "Not Started") {
            setSprint({...sprint, 
                status: "In Progress", 
                started: true
            })
            alert("Sprint starts!");
            return 
        }
        
        if (sprint.status === "In Progress") {
            alert("Sprint is already in progress!");
            return
        }

        if (sprint.status === "Completed") {
            alert("You can't start a completed sprint!")
        }
    }

    return (
        <>
        <nav>
            <Link to="/login">Login Page  &nbsp; | </Link> &nbsp; &nbsp;
            <Link to="/projects">Projects &nbsp; | </Link> &nbsp; &nbsp;
            <Link to="/view">Project View: {activeP.id} &nbsp; | </Link> &nbsp; &nbsp;
            <Link to="/sprints">Sprint View: {activeSprint.id} </Link>
        </nav>
        <h1>Sprint Manager</h1>
        <FunctionalButton text = "View Sprint Board" func = {() => navigate("/sprint_board")}/>
        <FunctionalButton text = "Start Sprint" func = {() => startSprint()}/>
        <div onDragOver={onDragOver}>
        <div style={{display:"flex", flexDirection:"row", justifyContent:"center"}}>
            <div width={"400px"} onDrop={(event) => {dragSprintEvent(event, 1)}} style={{border:"2px solid grey"}}>
                <div style={{width:"300px"}}/>
                <h2>Product Backlog</h2>
                {activeP.tasks.filter(t => !sprint.sprintBacklog.includes(t.id)).map(t => { return ( <Card task = {t} key = {t.id} onDrag = {(event) => {dragTask(event, t)}} onDragEnd = {dragEnd}/> )})}
            </div>
            
            <div width={"400px"}onDrop={(event) => {dragSprintEvent(event, 0)}} style={{border:"2px solid grey"}}>
                <div style={{width:"300px"}}/>
                <h2>Sprint Backlog</h2>
                {activeP.tasks.filter(t => sprint.sprintBacklog.includes(t.id)).map(t => { return ( <Card task = {t} key = {t.id} onDrag = {(event) => {dragTask(event, t)}} onDragEnd = {dragEnd}/> )})}
            </div>  
        </div>
        </div> 
        </>
    )
}

export default SprintManager ;
