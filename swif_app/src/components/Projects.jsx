import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

import { MdFolder } from "react-icons/md";

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
        event.preventDefault();
        console.log('submitting form')
        if (name.length === 0) { return } // don't accept empty project names
        setState({
            ...state,
            projects: state.projects.concat(name)
        })
    }

    const createProjectElement = (projectName) => {
        return (
            <div className="project-element" key={projectName} onClick={() => {openProject(projectName)}}>
                <div><MdFolder size={100}></MdFolder></div>
                {projectName}
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

    // component to display projects
    const projectDisplay =
    <div className="project-elements-display">
        {getProjectElements()}
    </div>;

    return (
        <>
            {JSON.stringify(state)}
            <h2>{projectDisplay}</h2>
            
            <button onClick={() => setState({ ...state, testCount: state.testCount + 1 })}>update state</button>
            <button onClick={() => setState(INITIAL_STATE)}>reset</button>
            <button onClick={() => localStorage.clear()}>clear</button>
    
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
        </>
    )
}

export default Projects