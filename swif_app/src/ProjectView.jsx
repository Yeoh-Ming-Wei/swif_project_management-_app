import { useState, useEffect } from 'react';
import { MdList, MdDelete, MdDirectionsRun } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import FunctionalButton from './components/buttons/functionalbutton';

const ProjectView = () => {                                                                                 

    const projectObj = JSON.parse(localStorage.getItem("projects"))

    const [project, setProject] = useState(projectObj);

    // runs whenever projects change
    useEffect(() => {
        console.log("writing project to local storage", project);
        localStorage.setItem("projects", JSON.stringify(project)); // convert to string before storing
    }, [project]);

    const navigate = useNavigate();

    const deleteProject = () => {
        console.log("deleting project");
        // projects array with project removed
        const newProjects = project.projects.filter(project_ => {
            console.log(project_, project_.id, project_);
            return project_.id != project.activeProject;
        })
        setProject({
            ...project,
            projects: newProjects,
            activeProject: null
        });
        setTimeout(() => {         // delay navigation very slightly, to allow code above to take effect (hacky solution)
            navigate("/projects"); // return to projects view
        }, 1);
        
    }
    
    const productBacklogButton = <FunctionalButton 
        func = {() => navigate("/product-backlog")}
        text = {<>
                <div><MdList size={80} /></div>
                <div>Product Backlog</div>
                </>} />

    const sprintViewButton = <FunctionalButton 
        func = {() => navigate("/sprints")}
        text = {<>
                <div><MdDirectionsRun size={80} /></div>
                <div>Sprint View</div>
                </>}/>

    const deleteProjectButton = <FunctionalButton 
        func = {() => deleteProject()}
        text = {<>
                <div><MdDelete size={80} /></div>
                <div>Delete Project</div>
                </>}/>

    return (
        <>
            <h1>Project View</h1>
            <h2>Project Name: {project.activeProject}</h2>
            <div>
                {productBacklogButton}
                &nbsp;
                &nbsp;
                {sprintViewButton}
                &nbsp;
                &nbsp;
                {deleteProjectButton}
            </div>
        </>
    );
}

export default ProjectView;