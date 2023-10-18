import React from 'react';
import { calculateMemberEffort } from './components/utils';

const TeamDashboard = () => {
    const projects = JSON.parse(localStorage.getItem("projects"));
    const activeProjectId = projects.activeProject;
    const activeProject = projects.projects.find((project) => {return project.id == activeProjectId});
    const activeSprint = activeProject.sprints.filter(sprint => sprint.id == projects.activeSprint)[0]
    const teamMembers = activeProject.team;

    const createAccountCard = (account) => {
        const memberTasks = activeProject.tasks.filter(task => task.assignee === account.name);
        const effort = calculateMemberEffort(activeProject, activeSprint, memberTasks);
        return effort
    }

    return (
        <div className="team-dashboard-container">
            <h1>Team Dashboard</h1>
            
            <div className="members-list">
            {teamMembers.map(member => (
                <>
                <div className="member-card" key={member.id}>
                    <h3>{member.name} | Username: {member.email}</h3>
                    <p>Total Work Hours: {createAccountCard(member).totalHours}</p>
                    <p>Total Work Days: {createAccountCard(member).totalDays}</p>
                    <p>Average hours: {createAccountCard(member).totalHours / createAccountCard(member).totalDays}</p>
                </div>
                </>
                
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