import FunctionalButton from "./components/buttons/functionalbutton";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

import Card from "./components/Card";

const SprintManager = () => {

    const p = JSON.parse(localStorage.getItem("projects"))
    const activeP = p.projects.filter(project => project.id == p.activeProject)[0]
    const activeSprintBacklog = activeP.sprints.filter(sprint => sprint.id == p.activeSprint)[0]

    const [sprintTask, setActiveSprintTask] = useState(activeSprintBacklog)
    const [draggedTask, setDraggedTask] = useState(null);

    const navigate = useNavigate()

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

    return (
        <>
        <FunctionalButton text = "View Sprint Board" func = {() => navigate("/sprint_board")}/>

        <div style={{display:"flex", flexDirection:"row", justifyContent:"center", }}>
            <div width={"400px"} style={{border:"2px solid grey"}}>
                <div style={{width:"300px"}}/>
                <h2>Product Backlog</h2>
                {activeP.tasks.map(t => { return ( <Card task = {t} key = {t.id} onDrag = {(event) => {dragTask(event, t)}} onDragEnd = {dragEnd}/> )})}
            </div>
            
            <div style={{border:"2px solid grey"}}>
                <div style={{width:"300px"}}/>
                <h2>Sprint Backlog</h2>

            </div>  
        </div>
        </>
        

    )
    
}

export default SprintManager ;