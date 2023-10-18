import React from 'react';

const TeamDashboard = () => {
    const projects = JSON.parse(localStorage.getItem("projects"));
    const activeProjectId = projects.activeProject;
    const activeProject = projects.projects.find((project) => {return project.id == activeProjectId});
    const teamMembers = activeProject.team;

    return (
        <div className="team-dashboard-container">
            <h1>Team Dashboard</h1>
            <div className="project-dates">
                <p>Start Date: {activeProject.startDate}</p>
                <p>End Date: {activeProject.endDate}</p>
            </div>
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

export default TeamDashboard;