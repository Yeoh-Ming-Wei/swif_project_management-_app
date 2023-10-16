import { useState, useEffect } from 'react';
import { MdAddBox, MdDashboard } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Popup from 'reactjs-popup';

const TeamView = () => {
    const navigate = useNavigate();

    const projects = JSON.parse(localStorage.getItem("projects"));
    const activeProjectId = projects.activeProject;
    const activeProject = projects.projects.find((project) => {return project.id == activeProjectId});
    const projectTeam = activeProject.team;

    const activeAccount = JSON.parse(localStorage.getItem("activeAccount"));

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
        newProjects.projects = newProjects.projects.map(
            project => {
                if (project.id == activeProjectId) {
                    console.log('replacing!', newActiveProject);
                    return newActiveProject;
                }
                return project;
            }
        )
        console.log('updated new projects', newProjects);
        localStorage.setItem("projects", JSON.stringify(newProjects)); // convert to string before storing
    }, [team]);

    const [activeProfile, setActiveProfile] = useState();
    useEffect(() => {
        // Save the active profile to localStorage whenever it changes
        localStorage.setItem('activeProfile', JSON.stringify(activeProfile));
    }, [activeProfile]);


    function createUserAccount(id, name, email, password, accountType) {
        return {
            id: id,
            email: email,
            name: name,
            password: password,
            accountType: accountType
        };
    }

    const viewProfile = (member) => {
        console.log('viewing', member)
        setActiveProfile(member);
        setTimeout(() => {         // delay navigation very slightly, to allow code above to take effect (hacky solution)
            navigate("/profile"); // return to projects view
        }, 1);
    }

    const createAccountCard = (account) => {
        return (
            <div id={account.id} className={"card"} style={{width: '18rem', height: '10rem', margin: "10px", padding: "10px", backgroundColor: "lightpink", color: "black", borderRadius: "16px"}}>
                <div className="card-body" style={{display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
                    <h3 className="card-title" align="left">{account.name}</h3>
                    <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>{account.email}</div>
                    <div style={{display:"flex", flexDirection:"row", justifyContent:"end"}}>
                        <button onClick={() => {viewProfile(account)}}>Profile</button>
                        {activeAccount.accountType == "Admin" ?
                        <><button>Analyze</button>
                        <button>Remove</button></>: ""}
                        
                    </div>
                </div>
            </div>
        )
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('submitting form');

        const elementValue = (str) => (document.getElementById(str).value);
        const newMember = createUserAccount(memberId, elementValue("memberName"), elementValue("memberEmail"), elementValue("memberPassword"), "Member")
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
                    Enter email address: <input 
                    type="email" 
                    id = "memberEmail"
                    />
                </label>
                <br />
                <label>
                    Enter password: <input
                    type = "password"
                    id = "memberPassword"
                    defaultValue= "12345"
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
            return (account.accountType == "Admin") ? "" : createAccountCard(account);
        });

    }

    const dashBoardButton = () => {
        return <button type="button" className="button">
            <div><MdDashboard size={36} /></div>
            <div>View Team Dashboard</div>
        </button>;
    }

    return (<>
        <h1>Team Members</h1>
        {(team.length > 0) ? "" : <h4>You have no team members! Click the button below to add one.</h4>}
        {createMemberPopup()}
        {MemberDisplay()}
        {(team.length > 0) ? dashBoardButton() : ""}
    </>);

}

export default TeamView;