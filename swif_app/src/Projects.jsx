import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { MdFolder, MdAddBox } from "react-icons/md";
import Popup from 'reactjs-popup';

const Projects = () => {
    const INITIAL_PROJECTS = {
        // testCount: 0,
        projects: [],
        activeProject: null,
    };

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

    // initialise using stored state, if any, or the intial state otherwise
    const [project, setProject] = useState(getProject());

    // runs whenever projects change
    useEffect(() => {
        console.log("writing project to local storage", project);
        localStorage.setItem("projects", JSON.stringify(project)); // convert to string before storing
    }, [project]);


    const [name, setName] = useState("");



    const createProjectElement = (projectName) => {
        return (
            <Link to="../view" style={{color:"white"}}>
                <button className="project-element" key={projectName} onMouseEnter={() => {updateActiveProject(projectName)}} >
                    <div><MdFolder size={100} /></div>
                    <div>{projectName}</div>
                
                </button>
            </Link>
        );
    }

    // runs when projects are hovered over
    const updateActiveProject = (projectName) => {
        // alert("project opened: " + projectName);
        console.log("project opened: " + projectName);
        // set active project
        setProject({
            ...project,
            activeProject: projectName
        })

    }

    const getProjectElements = () => {
        return <>{project.projects.map((projectName) => createProjectElement(projectName.id))}</>
    }

    // runs whenever form is submitted
    const handleSubmit = (event) => {
        const isValidProjectName = (name) => {
            if (name.length === 0) {
                console.log("rejecting empty project name");
                alert("Project name cannot be empty!");
                return false;
            }
            console.log(project.projects)
            if (project.projects.filter((project) => (project.id == name)).length > 0) {
                console.log("duplicate project name, rejecting");
                alert("Project with that name already exists! Please choose a different name.")
                return false;
            }
            return true;
        }
        event.preventDefault();
        console.log('submitting form')

        if (!isValidProjectName(name)) { return } // don't accept invalid names
        const newProject = {
            id: name,
            tasks: [],
            sprints: [],
        }
        setProject({
            ...project,
            projects: project.projects.concat(newProject)
        })
    }

    const addProjectForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <label>Enter new project name:
                    <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <input type="submit" value="Add"/>
            </form>
        )
    }

    const [open, setOpen] = useState(false);

    const createProjectPopup = () => {
        const closeModal = () => setOpen(false);
        return (
            <div>
                <button type="button" className="button" onClick={() => setOpen(o => !o)} >
                    <div><MdAddBox size={36} /></div>
                    <div>Create New Project</div>
                </button>
                <Popup open={open} closeOnDocumentClick onClose={closeModal}>
                    <div className="modal">
                        <a className="close" onClick={closeModal}>&times;</a>
                        {addProjectForm()}
                    </div>
                </Popup>
            </div>
        );
    };

    // component to display projects
    const projectDisplay =
        <div className="project-elements-display">
            {(project.projects.length > 0) ? "" : <h4>You have no projects! Click the button below to add one.</h4>}
            {getProjectElements()}
        </div>;

    return (
        <>
            <h1>Projects</h1>
            {/* {JSON.stringify(project)} */}
            {projectDisplay}
            {createProjectPopup()}
{/*             
            <button onClick={() => setState({ ...state, testCount: state.testCount + 1 })}>update state</button> */}
            {/* <button onClick={() => setProject(INITIAL_PROJECTS)}>reset</button>
            <button onClick={() => localStorage.clear()}>clear</button> */}
    
            
        </>
    )
}

export default Projects