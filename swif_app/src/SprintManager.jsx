import FunctionalButton from "./components/buttons/functionalbutton";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

import Card from "./components/Card";

const SprintManager = () => {

    const p = JSON.parse(localStorage.getItem("projects"))
    const activeP = p.projects.filter(project => project.id == p.activeProject)[0]
    const activeSprint= activeP.sprints.filter(sprint => sprint.id == p.activeSprint)[0]

    const [sprintTask, setActiveSprintTask] = useState(activeSprint.sprintBacklog)
    const [draggedTask, setDraggedTask] = useState(null);

    const navigate = useNavigate()

    useEffect(() => {
        console.log("updating dragged task to local storage", draggedTask);
        localStorage.setItem("draggedTask", JSON.stringify(draggedTask)); // convert to string before storing
    }, [draggedTask]);

    useEffect(() => {
        activeSprint.sprintBacklog = sprintTask
        p.projects.map(project => {
            if (project.id == activeP.id){
                project = activeP
            }
            return project
        })
        localStorage.setItem("projects", JSON.stringify(p))
    }, [sprintTask])


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

    const onDragOver = (e) => {
        e.stopPropagation();
        e.preventDefault();
    };

    const dragSprintEvent = (event, n) => {
        // parameter n : n = 0 -> Product to Sprint, n = 1 -> Sprint to Product
        setDraggedTask(null);
        console.log("dropped", draggedTask);

        if (n == 0) {
            setActiveSprintTask(sprintTask.concat(draggedTask.id))
        }
        if (n == 1) {
            setActiveSprintTask(sprintTask.filter(t => t != draggedTask.id))
        }

    }

    return (
        <>
        <FunctionalButton text = "View Sprint Board" func = {() => navigate("/sprint_board")}/>
        <div onDragOver={onDragOver}>
        <div style={{display:"flex", flexDirection:"row", justifyContent:"center"}}>
            <div width={"400px"} onDrop={(event) => {dragSprintEvent(event, 1)}} style={{border:"2px solid grey"}}>
                <div style={{width:"300px"}}/>
                <h2>Product Backlog</h2>
                {activeP.tasks.filter(t => !sprintTask.includes(t.id)).map(t => { return ( <Card task = {t} key = {t.id} onDrag = {(event) => {dragTask(event, t)}} onDragEnd = {dragEnd}/> )})}
            </div>
            
            <div width={"400px"}onDrop={(event) => {dragSprintEvent(event, 0)}} style={{border:"2px solid grey"}}>
                <div style={{width:"300px"}}/>
                <h2>Sprint Backlog</h2>
                {activeP.tasks.filter(t => sprintTask.includes(t.id)).map(t => { return ( <Card task = {t} key = {t.id} onDrag = {(event) => {dragTask(event, t)}} onDragEnd = {dragEnd}/> )})}
            </div>  
        </div>
        </div> 
        </>
        

    )
    
}

export default SprintManager ;