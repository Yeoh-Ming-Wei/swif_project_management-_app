import { useState, useEffect } from 'react';
import { Link, Navigate } from "react-router-dom";
import { MdFolder, MdAddBox } from "react-icons/md";
import Popup from 'reactjs-popup';

const Projects = () => {
    const INITIAL_STATE = {
        // testCount: 0,
        projects: [],
        activeProject: null,
    };

    const getState = () => {
        const storedState = JSON.parse(localStorage.getItem("state")); // converting from string to object
        if (storedState) {
          console.log("stored state found, restoring", storedState);
          return storedState;
        } else {
          console.log("no state found, initialising state", INITIAL_STATE);
          return INITIAL_STATE;
        }
    };

    // initialise using stored state, if any, or the intial state otherwise
    const [state, setState] = useState(getState());

    // runs whenever state changes
    useEffect(() => {
        console.log("writing state to local storage", state);
        localStorage.setItem("state", JSON.stringify(state)); // convert to string before storing
    }, [state]);


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
        setState({
            ...state,
            activeProject: projectName
        })

    }

    const getProjectElements = () => {
        return <>{state.projects.map((projectName) => createProjectElement(projectName.id))}</>
    }

    // runs whenever form is submitted
    const handleSubmit = (event) => {
        const isValidProjectName = (name) => {
            if (name.length === 0) {
                console.log("rejecting empty project name");
                alert("Project name cannot be empty!");
                return false;
            }
            console.log(state.projects)
            if (state.projects.includes(name)) {
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
        }
        setState({
            ...state,
            projects: state.projects.concat(newProject)
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
            <div display={"flex"} flex-direction={"row"}>
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
        );};

    // component to display projects
    const projectDisplay =
        <div className="project-elements-display">
            {(state.projects.length > 0) ? "" : <h4>You have no projects! Click the button below to add one.</h4>}
            {getProjectElements()}
        </div>;

    return (
        <>
            <h1>Projects</h1>
            {JSON.stringify(state)}
            {projectDisplay}
            {createProjectPopup()}
{/*             
            <button onClick={() => setState({ ...state, testCount: state.testCount + 1 })}>update state</button> */}
            <button onClick={() => setState(INITIAL_STATE)}>reset</button>
            <button onClick={() => localStorage.clear()}>clear</button>
    
            
        </>
    )
}

export default Projects