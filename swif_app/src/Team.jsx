import React from 'react';
import { Link } from 'react-router-dom';

const Team = () => {
    <nav>
        <Link to="projects">Projects &nbsp;| </Link> &nbsp; &nbsp;
        <Link to="/project-view">Project View &nbsp;| </Link> &nbsp; &nbsp;
        <Link to="/product-backlog">Product Backlog &nbsp;| </Link> &nbsp; &nbsp;
        <Link to="/sprint-view">Sprint View &nbsp;| </Link> &nbsp; &nbsp;
        <Link to="/sprint-backlog">Sprint Backlog &nbsp;| </Link> &nbsp; &nbsp;
        <Link to="/team">Team</Link> &nbsp;
    </nav>
    return <h1>Team</h1>;
};

export default Team;