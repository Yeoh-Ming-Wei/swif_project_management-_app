import { useState, useEffect } from 'react';
import { MdAddBox } from "react-icons/md";
import Popup from 'reactjs-popup';

const TeamView = () => {
    const projects = JSON.parse(localStorage.getItem("projects"));
    const activeProjectId = projects.activeProject;
    const activeProject = projects.projects.find((project) => {return project.id == activeProjectId});
    const projectTeam = activeProject.team;

    const [memberId, setMemberId] = useState(JSON.parse(localStorage.getItem("memberId")) || 1);
    useEffect(() => {
        // Save the member id to localStorage whenever it changes
        localStorage.setItem('memberId', memberId);
    }, [memberId]);

    const [team, setTeam] = useState(projectTeam || []);
    useEffect(() => {
        console.log("updating team to local storage", team);
        let newProjects = projects;
        const newActiveProject = {...activeProject,
            team: team,
        }
        newProjects.projects.map(
            project => {
                if (project.id == activeProjectId) {
                    project = newActiveProject;
                }
                return project;
            }
        )
        console.log('updated new projects', newProjects);
        localStorage.setItem("projects", JSON.stringify(newProjects)); // convert to string before storing
    }, [team]);

    console.log('team',team)

    function createUserAccount(id, profilePicture, name, password, accountType) {
        return {
            id: id,
            profilePicture: profilePicture,
            name: name,
            password: password,
            accountType: accountType
        };
    }
    // const accounts = [
    //     createUserAccount(1, "Profile1", "Alice", "Password1", "Member"),
    //     createUserAccount(2, "Profile2", "Ben", "Password2", "Member"),
    //     createUserAccount(3, "Profile3", "Carol", "Password3", "Member"),
    //     createUserAccount(4, "Profile4", "Dennis", "Password4", "Admin")
    // ];

    const createAccountCard = (account) => {
        return (
            <div id={account.id} className={"card"} style={{width: '18rem', height: '10rem', margin: "10px", padding: "10px", backgroundColor: "white", color: "black", borderRadius: "16px"}}>
                <div className="card-body" style={{display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
                    <h3 className="card-title" align="left">{account.name}</h3>
                    <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                        <p className="card-text" align="left">{account.accountType}</p>
                    </div>
                    <div style={{display:"flex", flexDirection:"row", justifyContent:"end"}}>
                        {/* <button>Edit</button>
                        <button>Delete</button> */}
                    </div>
                </div>
            </div>
        )
    }

    const handleSubmit = (event) => {
        // const isValidSprintName = (name) => {
        //     if (name.length === 0) {
        //         console.log("rejecting empty sprint name");
        //         alert("Sprint name cannot be empty!");
        //         return false;
        //     }
        //     console.log(sprints)
        //     if (sprints.filter((sprint) => (sprint.id == name)).length > 0) {
        //         console.log("duplicate sprint name, rejecting");
        //         alert("Sprint with that name already exists! Please choose a different name.")
        //         return false;
        //     }
        //     return true;
        // }
        event.preventDefault();
        console.log('submitting form');

        const elementValue = (str) => (document.getElementById(str).value);
        // if (!isValidSprintName(elementValue('sprintName'))) { return }; // don't accept invalid names
        
        // const newSprint = {
        //     id: elementValue("sprintName"),
        //     sprintBacklog: [],
        //     startDate: elementValue("sprintStartTime"),
        //     endDate: elementValue("sprintEndTime"),
        //     status: "Not Started",
        //     started: false,
        // };
        // console.log(newSprint)
        // setSprints(
        //     sprints.concat(newSprint)
        // );
        const newMember = createUserAccount(memberId, null, elementValue("memberName"), elementValue("memberPassword"), "Member")
        setTeam(team.concat(newMember));
        setMemberId(memberId + 1);
    }

    const addMemberForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <label>
                    Enter new member name: <input 
                    type="text" 
                    id = "memberName"
                    />
                </label>
                <br />
                <label>
                    Enter password: <input
                    type = "password"
                    id = "memberPassword"
                    />
                </label>
                <br />
                <input type="submit" value="Add Member"/>
            </form>
        )
    }

    const [open, setOpen] = useState(false);

    const createMemberPopup = () => {
        const closeModal = () => setOpen(false);
        return (
            <div>
                <br></br>
                <button type="button" className="button" onClick={() => setOpen(o => !o)} >
                    <div><MdAddBox size={36} /></div>
                    <div>Add Team Member</div>
                </button>
                <Popup open={open} closeOnDocumentClick onClose={closeModal}>
                    <div className="modal">
                        <a className="close" onClick={closeModal}>&times;</a>
                        {addMemberForm()}
                    </div>
                </Popup>
            </div>
        );
    };

    const MemberDisplay = () => {
        return team.map((account) => {
            // console.log(account);
            return createAccountCard(account);
        });

    }

    return (<>
        <h1>Team Members</h1>
        {(team.length > 0) ? "" : <h4>You have no team members! Click the button below to add one.</h4>}
        {createMemberPopup()}
        {MemberDisplay()}
    </>);

}

export default TeamView;