import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { MdAddBox, MdDirectionsRun } from "react-icons/md";
import Popup from 'reactjs-popup';

const SprintView = () => {
    const projects = JSON.parse(localStorage.getItem("projects"));
    const activeProjectId = projects.activeProject;
    const activeProject = projects.projects.find((project) => {return project.id == activeProjectId});
    const [sprints, setSprints] = useState(activeProject.sprints);
    const [activeSprintName, setActiveSprint] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        console.log("updating sprints to local storage", sprints);
        let newProjectsList = projects.projects;
        newProjectsList = newProjectsList.filter(
            (project) => { return project.id != activeProjectId; }
        )
        const newProject = {...activeProject,
            sprints: sprints,
        }
        newProjectsList = newProjectsList.concat(newProject);
        const newProjects = {...projects,
            projects: newProjectsList,
        }
        localStorage.setItem("projects", JSON.stringify(newProjects)); // convert to string before storing
    }, [sprints]);

    useEffect(() => {
        console.log("updating active sprint to local storage", activeSprintName);
        projects.activeSprint = activeSprintName
        localStorage.setItem("projects", JSON.stringify(projects)); // convert to string before storing
    }, [activeSprintName]);

    const createSprintElement = (sprintName) => {
        return <>
            <button 
                type="button" 
                className="button" 
                onClick={() => navigate("/sprint_manager")}
                onMouseEnter={() => setActiveSprint(sprintName)}
            >
                <div><MdDirectionsRun size={80} /></div>
                <div>{sprintName}</div>
            </button> 
            &nbsp;
            &nbsp;
        </>
    }

    // runs whenever form is submitted
    const handleSubmit = (event) => {
        const isValidSprintName = (name) => {
            if (name.length === 0) {
                console.log("rejecting empty sprint name");
                alert("Sprint name cannot be empty!");
                return false;
            }
            console.log(sprints)
            if (sprints.filter((sprint) => (sprint.id == name)).length > 0) {
                console.log("duplicate sprint name, rejecting");
                alert("Sprint with that name already exists! Please choose a different name.")
                return false;
            }
            return true;
        }
        event.preventDefault();
        console.log('submitting form');

        const elementValue = (str) => (document.getElementById(str).value);
        if (!isValidSprintName(elementValue('sprintName'))) { return }; // don't accept invalid names
        
        const newSprint = {
            id: elementValue("sprintName"),
            sprintBacklog: [],
            startDate: elementValue("sprintStartTime"),
            endDate: elementValue("sprintEndTime"),
            started: false,
        };
        console.log(newSprint)
        setSprints(
            sprints.concat(newSprint)
        );
    }

    const addSprintForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <label>
                    Enter new sprint name: <input 
                    type="text" 
                    id = "sprintName"
                    />
                </label>
                <br />
                <label>
                    Enter sprint start date: <input
                    type = "datetime-local"
                    id = "sprintStartTime"
                    />
                </label>
                <br />
                <label>Enter sprint end date: <input
                    type = "datetime-local"
                    id = "sprintEndTime"
                    />
                </label>
                <br />
                <input type="submit" value="Add Sprint"/>
            </form>
        )
    }

    const [open, setOpen] = useState(false);

    const createSprintPopup = () => {
        const closeModal = () => setOpen(false);
        return (
            <div>
                <br></br>
                <button type="button" className="button" onClick={() => setOpen(o => !o)} >
                    <div><MdAddBox size={36} /></div>
                    <div>Create New Sprint</div>
                </button>
                <Popup open={open} closeOnDocumentClick onClose={closeModal}>
                    <div className="modal">
                        <a className="close" onClick={closeModal}>&times;</a>
                        {addSprintForm()}
                    </div>
                </Popup>
            </div>
        );
    };

    console.log('test', sprints)
    const sprintDisplay = sprints.map((sprint) => createSprintElement(sprint.id));

    return (<>
        <h1>Sprint View</h1>
        
        {(sprints.length > 0) ? "" : <h4>You have no sprints! Click the button below to add one.</h4>}
        {sprintDisplay} 
        {createSprintPopup()}
    </>);
};

export default SprintView;