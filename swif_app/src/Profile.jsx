import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';

const Profile = () => {
    const projects = JSON.parse(localStorage.getItem("projects"));
    const activeProjectId = projects.activeProject;
    const activeProject = projects.projects.find((project) => {return project.id == activeProjectId});
    const projectTeam = activeProject.team;
    

    const activeAccount = JSON.parse(localStorage.getItem("activeAccount"));
    const isAdmin = activeAccount.accountType == "Admin";
    const activeProfile = JSON.parse(localStorage.getItem("activeProfile"));
    console.log('loading profile as', activeAccount, 'of', activeProfile);

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

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('submitting form');
        const elementValue = (str) => (document.getElementById(str).value);
        console.log('newpass', elementValue("memberPassword"))
        
        const newMember = {...activeProfile,
            name: isAdmin ? elementValue("memberName") : activeProfile.name,
            email: isAdmin ? elementValue("memberEmail") : activeProfile.email,
            password: elementValue("memberPassword"),
        };

        setTeam(team.map(
            (member) => {
                console.log('comparing profiles', member, activeProfile)
                if (member.id == activeProfile.id) {
                    console.log('updating member details!', newMember)
                    return newMember;
                } else { return member; }
            }
        ));
        localStorage.setItem('activeProfile', JSON.stringify(newMember));
    }

    const editDetailsForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                {isAdmin ? <>
                    <label>
                        Enter new member name: <input 
                        type="text" 
                        id = "memberName"
                        defaultValue = {activeProfile.name}
                        />
                    </label>
                    <br />
                    <label>
                        Enter new email address: <input 
                        type="email" 
                        id = "memberEmail"
                        defaultValue = {activeProfile.email}
                        />
                    </label>
                    <br />
                </> : ""}
                
                <label>
                    Enter new password: <input
                    type = "password"
                    id = "memberPassword"
                    defaultValue = {activeProfile.password}
                    />
                </label>
                <br />
                <input type="submit" value="Save Details"/>
            </form>
        )
    }

    const [open, setOpen] = useState(false);

    const editDetailsPopup = () => {
        const closeModal = () => setOpen(false);
        return (
            <div>
                <br></br>
                <button type="button" className="button" onClick={() => setOpen(o => !o)} >
                    <div>Edit Details</div>
                </button>
                <Popup open={open} closeOnDocumentClick onClose={closeModal}>
                    <div className="modal">
                        <a className="close" onClick={closeModal}>&times;</a>
                        {editDetailsForm()}
                    </div>
                </Popup>
            </div>
        );
    };

    return <>
        <h1>Member Profile</h1>
        <h3>Name: {activeProfile.name}</h3>
        <h3>Email: {activeProfile.email}</h3>
        {editDetailsPopup()}

    </> 
};

export default Profile;