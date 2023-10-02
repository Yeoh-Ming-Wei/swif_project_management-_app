import { useState, useEffect } from 'react';
import { MdList, MdDelete, MdDirectionsRun } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const ProjectView = () => {
    const getProject = () => {
        const storedProjects = JSON.parse(localStorage.getItem("projects")); // converting from string to object
        if (storedProjects) {
          console.log("stored projects found, restoring", storedProjects);
          return storedProjects;
        } else {
          console.log("no projects found, initialising projects", INITIAL_PROJECTS);
          return INITIAL_PROJECTS;
        }
    };

    const [project, setProject] = useState(getProject());

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

    const backlogButton =   
        <button 
            type="button" 
            className="button" 
            onClick={() => navigate("/product-backlog")}
        >
            <div><MdList size={80} /></div>
            <div>Product Backlog</div>
            
        </button>

    

    const sprintViewButton =   
    <button 
        type="button" 
        className="button" 
        onClick={() => navigate("/sprints")}
    >
        <div><MdDirectionsRun size={80} /></div>
        <div>Sprint View</div>
    </button>

    const deleteProjectButton =
        <button 
            type="button" 
            className="button"
            onClick={() => deleteProject()}
        >
            <div><MdDelete size={80} /></div>
            <div>Delete Project</div>
        </button>

    return (
        <>
            <h1>Project View</h1>
            <h2>Project Name: {project.activeProject}</h2>
            <div>
                {backlogButton}
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