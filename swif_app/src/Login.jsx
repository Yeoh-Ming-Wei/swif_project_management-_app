import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";

const loginForm = () => {
    const navigate = useNavigate();
    const adminAccount = {
        id: 0,
        email: "admin",
        name: "admin",
        password: "admin12345",
        accountType: "Admin"
    };
    const newProject = {
        id: "Project",
        tasks: [],
        sprints: [],
        team: [adminAccount],
    }

    const defaultProject = () => {
        // testCount: 0,
        return { 
            projects: [newProject],
            activeProject: "Project",
            activeSprint: null
        }
    };

    const projects = JSON.parse(localStorage.getItem("projects")) || defaultProject();
    const activeProjectId = projects.activeProject;
    const activeProject = projects.projects.find((project) => {return project.id == activeProjectId}) || newProject;
    const projectTeam = activeProject.team;

    console.log('setting up login...', activeProjectId, activeProject, projectTeam)

    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [activeAccount, setActiveAccount] = useState();
    useEffect(() => {
        // Save the active account to localStorage whenever it changes
        localStorage.setItem('activeAccount', JSON.stringify(activeAccount));
    }, [activeAccount]);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('submitting form');
        console.log('attempting login:', username, password);
        let validLogin = false;
        for (let member of projectTeam) {
            console.log('comparing', member, username, password);
            if (member.email == username && member.password == password) {
                console.log('matching account found!', member);
                if (member.accountType == "Admin") {
                    console.log('admin login detected!');
                }
                setActiveAccount(member);
                validLogin = true;
            }
        }
        if (validLogin) {setTimeout(() => {         // delay navigation very slightly, to allow code above to take effect (hacky solution)
            navigate("/projects"); // return to projects view
        }, 1);} else {
            alert("Invalid login!");
        }
    }

    return <form onSubmit = {handleSubmit}>
        <label>
            Username: <input type="text" onChange={e => setUserName(e.target.value)}/>
        </label>
        <br/>
        <label>
            Password: <input type="password" onChange={e => setPassword(e.target.value)}/>
        </label>
        <div>
            <button type="submit">Login</button>
        </div>
    </form>
}

const Login = () => {
    return <>
        <nav><Link to="/login">Login Page</Link></nav>
        <h1>Welcome to Swif!</h1>
        {loginForm()}
    </>
};

export default Login;