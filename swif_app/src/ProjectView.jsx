import { useState, useEffect } from 'react';
import { MdList, MdDelete } from "react-icons/md";
import { RiTeamFill } from 'react-icons/ri'
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

    // const getActiveProject = () => {
    //     // looks for active project in project array
    //     const match = (getState().projects.find((x)=> {
    //         return (x.id == getState().activeProject)
    //     }))
    //     if (match === undefined) {
    //         console.log("no match found");
    //         return {id: "no active project found"}
    //     }
    //     return match
    // }
    const navigate = useNavigate();
    const navigateToProjects = () => navigate("../projects");
    const navigateToBacklog = () => navigate("../product-backlog");

    const deleteProject = () => {
        console.log("deleting project");
        // projects array with project removed
        const newProjects = project.projects.filter(project => (project.id !== project.activeProject))
        setProject({
            ...project,
            projects: newProjects,
            activeProject: null
        });
    }

    const backlogButton =   
        <button type="button" className="button" onClick={navigateToBacklog}>
        <div><MdList size={36} /></div>
        <div>Product Backlog</div>
        </button>

    const deleteProjectButton =
        <button type="button" className="button" onClick={deleteProject}>
        <div><MdDelete size={36} /></div>
        <div>Delete Project</div>
        </button>
    return (
        <>
            <h1>Project View</h1>
            {/* {JSON.stringify(project)} */}
            <h2>Project Name: {project.activeProject}</h2>
            <div>
                <button 
                    type="button" 
                    className="button" 
                    onClick={() => navigate("/product-backlog")} // Add the onClick event here
                >
                    <div><MdList size={80} /></div>
                    <div>Product Backlog</div>

                </button>
            </div>
            {/* <div>
                <button 
                    type="button" 
                    className="button" 
                    onClick={() => navigate("/product-backlog")} // Add the onClick event here
                >
                    <div><RiTeamFill size={85} /></div>
                    <div>Team</div>
                </button>
            </div> */}
        </>
    );
}

export default ProjectView;