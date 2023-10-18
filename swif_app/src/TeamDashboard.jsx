import React from 'react';
import { calculateMemberEffort } from './utils';
//import { calculateMemberEffort } from ; // Adjust the path accordingly

const TeamDashboard = () => {
    const projects = JSON.parse(localStorage.getItem("projects"));
    const activeProjectId = projects.activeProject;
    const activeProject = projects.projects.find((project) => {return project.id == activeProjectId});
    const activeSprintName = projects.activeSprint
    const sprints = activeProject.sprints;
    const activeSprint = sprints.find(
        sprint => {
            console.log("checking", sprint);
            return sprint.id === activeSprintName;
        }
    );
    const startDate = new Date(activeSprint.startDate);
    const endDate = new Date(activeSprint.endDate);
    const teamMembers = activeProject.team;

    const createAccountCard = (account) => {
        const memberTasks = activeProject.tasks.filter(task => {
            console.log('comparing account', task.member.id, account.id)
            if (task.member.id == account.id) {
                console.log('success!');
                return true;
            };
        });
        console.log('pretest',activeProject.tasks)
        console.log('test', memberTasks);
        const effort = calculateMemberEffort(activeProject, activeSprint, memberTasks);
    
        return (
            <div id={account.id} className="member-card" backgroundcolor={"light-pink"}>
                <b>{account.name}<br/></b>
                {account.email}<br/>
                Total Work Hours: {effort.totalHours.toFixed(2)}<br/>
                Total Work Days: {effort.totalDays.toFixed(2)}<br/>
                Average Hours/ Day: {effort.totalDays != 0 ? (effort.totalHours / effort.totalDays).toFixed(2) : ""}
                
            </div>
        );
    }

    return (
        <div className="team-dashboard-container">
            <h1>Team Dashboard</h1>
            Start Date: {startDate.toUTCString().slice(0, -13)}
            <br/>
            End Date: {endDate.toUTCString().slice(0, -13)}
            
            <div className="members-list">
                {teamMembers.map(member => {
                    return (member.accountType == "Admin") ? "" : createAccountCard(member);;
                })}
            </div>
        </div>
    );
};








export default TeamDashboard;