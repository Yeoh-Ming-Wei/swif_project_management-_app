import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Link } from "react-router-dom";
import { MdFolder, MdAddBox } from "react-icons/md";
import Popup from 'reactjs-popup';

const Projects = () => {
    const INITIAL_STATE = {
        testCount: 0,
        projects: [],
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
        setState({
            ...state,
            projects: state.projects.concat(name)
        })
    }

    const createProjectElement = (projectName) => {
        return (
            <div className="project-element" key={projectName} onClick={() => {openProject(projectName)}} >
                <Link to="/projects" style={{color:"white"}}>
                    <div><MdFolder size={100}></MdFolder></div>
                    <div>{projectName}</div>
                </Link>
            </div>
        );
    }

    const openProject = (projectName) => {
        alert("project opened: " + projectName);
        console.log("project opened: " + projectName);
    }

    const getProjectElements = () => {
        const projectList = state.projects;
        return <>{projectList.map((projectName) => createProjectElement(projectName))}</>
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
                    <div><MdAddBox size={36} ></MdAddBox></div>
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
        {getProjectElements()}
    </div>;

    return (
        <>
            {JSON.stringify(state)}
            <h2>{projectDisplay}</h2>
            {createProjectPopup()}
            
            <button onClick={() => setState({ ...state, testCount: state.testCount + 1 })}>update state</button>
            <button onClick={() => setState(INITIAL_STATE)}>reset</button>
            <button onClick={() => localStorage.clear()}>clear</button>
    
            
        </>
    )
}

export default Projects