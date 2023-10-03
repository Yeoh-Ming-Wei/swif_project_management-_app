import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { MdAddBox, MdDirectionsRun } from "react-icons/md";
import Popup from 'reactjs-popup';

const SprintView = () => {
    const projects = JSON.parse(localStorage.getItem("projects"));
    const activeProjectId = projects.activeProject;
    const activeProject = projects.projects.find((project) => {return project.id == activeProjectId});
    const [sprints, setSprints] = useState(activeProject.sprints);
    const [sprintName, setSprintName] = useState("");
    const [sprintStartDate, setSprintStartDate] = useState("");
    const [sprintEndDate, setSprintEndDate] = useState("");
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

    console.log('test1', sprints)
    // const activeSprint = sprints.find(
    //     sprint => {
    //         console.log("checking", sprint);
    //         return sprint.id === activeSprintName;
    //     }
    // );

    useEffect(() => {
        console.log("updating active sprint to local storage", activeSprintName);
        localStorage.setItem("activeSprint", JSON.stringify(activeSprintName)); // convert to string before storing
    }, [activeSprintName]);

    const createSprintElement = (sprintName) => {
        return <>
            <button 
                type="button" 
                className="button" 
                onClick={() => navigate("/sprint_board")}
                onMouseEnter={() => setActiveSprint(sprintName)}
            >
                <div><MdDirectionsRun size={80} /></div>
                <div>{sprintName}</div>
            </button> 
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

        if (!isValidSprintName(sprintName)) { return }; // don't accept invalid names

        const newSprint = {
            id: sprintName,
            sprintBacklog: [],
            startDate: sprintStartDate,
            endDate: sprintEndDate,
            started: false,
        };

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
                    value={sprintName}
                    onChange={(e) => setSprintName(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Enter sprint start date: <input
                    type = "datetime-local"
                    id = "sprintStartTime"
                    onChange={(e) => setSprintStartDate(e.target.value)}
                    />
                </label>
                <br />
                <label>Enter sprint end date: <input
                    type = "datetime-local"
                    id = "sprintEndTime"
                    onChange={(e) => setSprintEndDate(e.target.value)}/>
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
        {/* {sprints} */}
        {/* {sprintName} */}
        <h1>Sprint View</h1>
        
        {(sprints.length > 0) ? "" : <h4>You have no sprints! Click the button below to add one.</h4>}
        {sprintDisplay}
        {createSprintPopup()}
    </>);
};

export default SprintView;