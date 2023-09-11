import { useState, useEffect } from 'react';
import { MdList, MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";


const ProjectView = () => {
    
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

    const [state, setState] = useState(getState());

    // runs whenever state changes
    useEffect(() => {
        console.log("writing state to local storage", state);
        localStorage.setItem("state", JSON.stringify(state)); // convert to string before storing
    }, [state]);

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
        const newProjects = state.projects.filter(project => (project.id !== state.activeProject))
        setState({
            ...state,
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
            {JSON.stringify(state)}
            <h2>Project Name: {state.activeProject}</h2>
            <div display={"flex"} flex-direction={"row"}>
                <button 
                    type="button" 
                    className="button" 
                    onClick={() => navigate("/product-backlog")} // Add the onClick event here
                >
                    <div><MdList size={36} /></div>
                    <div>Product Backlog</div>
                    <div> <br /> </div>
                    <div><MdList size={36} /></div>
                    <div>Team</div>
                </button>
            </div>
        </>
    );
}

export default ProjectView;