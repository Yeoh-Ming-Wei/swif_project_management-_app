import FunctionalButton from "./components/buttons/functionalbutton";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

const SprintManager = () => {
    const p = JSON.parse(localStorage.getItem("projects"))
    const activeP = p.projects.filter(project => project.id == p.activeProject)[0]

    const restoreTask = () => {
        console.log("Restoring Task")
        return activeP.sprint
    }

    const [sprintTask, setActiveSprintTask] = useState()
    const navigate = useNavigate()
    return (
        <FunctionalButton text = "View Sprint Board" func = {() => navigate("/sprint_board")}/>
    )
    
}

export default SprintManager ;