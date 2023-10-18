import React from 'react';
//import { calculateMemberEffort } from ; // Adjust the path accordingly

const TeamDashboard = () => {
    const projects = JSON.parse(localStorage.getItem("projects"));
    const activeProjectId = projects.activeProject;
    const activeProject = projects.projects.find((project) => {return project.id == activeProjectId});
    const teamMembers = activeProject.team;

    return (
        <div className="team-dashboard-container">
            <h1>Team Dashboard</h1>
            
            <div className="members-list">
                {teamMembers.map(member => (
                    <div className="member-card" key={member.id}>
                        <h3>{member.name}</h3>
                        <p>Email: {member.email}</p>
                        <p>Password: {member.password}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};





const createAccountCard = (account) => {
    const memberTasks = activeProject.tasks.filter(task => task.assignee === account.name);
    const effort = calculateMemberEffort(activeProject, activeSprint, memberTasks);

    return (
        <div id={account.id} className="member-card">
            
            <p>Total Work Hours: {effort.totalHours}</p>
            <p>Total Work Days: {effort.totalDays}</p>
            
        </div>
    );
}





export default TeamDashboard;