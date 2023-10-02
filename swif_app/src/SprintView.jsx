import { useState, useEffect } from 'react';
import { MdAddBox, MdDirectionsRun } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';

const SprintView = () => {
    const [sprints, setSprints] = useState(JSON.parse(localStorage.getItem("sprints")) || []);
    const [sprintName, setSprintName] = useState("");

    useEffect(() => {
        console.log("updating sprints to local storage", sprints);
        localStorage.setItem("sprints", JSON.stringify(sprints)); // convert to string before storing
    }, [sprints]);

    const navigate = useNavigate();

    const createSprintElement = (sprintName) => {
        return <>
            <button 
                type="button" 
                className="button" 
                onClick={() => navigate("/sprintRun")}
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
        };

        setSprints(
            sprints.concat(newSprint)
        );
    }

    const addSprintForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <label>Enter new sprint name:
                    <input 
                    type="text" 
                    value={sprintName}
                    onChange={(e) => setSprintName(e.target.value)}
                    />
                </label>
                <input type="submit" value="Add"/>
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


    const sprintDisplay = sprints.map((sprint) => createSprintElement(sprint.id));

    return (<>
        {/* {sprints} */}
        {sprintName}
        <h1>Sprint View</h1>
        
        {(sprints.length > 0) ? "" : <h4>You have no sprints! Click the button below to add one.</h4>}
        {sprintDisplay}
        {createSprintPopup()}
    </>);
};

export default SprintView;