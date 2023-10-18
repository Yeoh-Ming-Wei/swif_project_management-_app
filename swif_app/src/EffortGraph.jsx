import { Link } from 'react-router-dom';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const EffortGraph = () => {
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
    const activeSprintBacklog = activeSprint.sprintBacklog;
    const startDate = new Date(activeSprint.startDate);
    const endDate = new Date(activeSprint.endDate);
    const durationDays = (endDate.getTime() - startDate.getTime()) / ( (1000 * 3600 * 24))

    const activeProfile = JSON.parse(localStorage.getItem("activeProfile"));

    console.log('loading effort graph of', activeProfile);
    
    const createDataObject = (name, value) => {
        return ({
            name: name,
            pv: value,
        });
    }
    
    let data = [];

    for (let i = 0; i <= durationDays; i++) {
        console.log("day", i)
        const newDate = new Date(startDate.getTime() + (i * (86400000))) // a day in ms
        const workedHours = activeSprintBacklog.filter(
          (taskId) => {
            const task = activeProject.tasks.find((task) => {return task.id == taskId});
            return (task.taskStage == "2" || task.taskStage == "3");
          }
        ).reduce(
          (acc, taskId) => {
            const task = activeProject.tasks.find((task) => {return task.id == taskId});
            const taskStartDate = new Date (task.startDate);
            const taskEndDate = new Date (task.endDate);
            console.log('checking time', newDate)

            if (newDate >= taskStartDate && newDate <= taskEndDate) {
              const hours =  (taskEndDate - taskStartDate) / (3600000)
              console.log('hours worked', taskEndDate, taskStartDate, hours)
              return acc + hours;
            } else {
              return acc;
            }
          }, 0
        )
        console.log('tallied working hours', workedHours);
        data.push(createDataObject(newDate.toUTCString().slice(0, -18), workedHours));
      }

    const barChart =
        <BarChart
            width={800}
            height={500}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 25,
                bottom: 15,
            }}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" label={{value: "Day", offset:-5, position: "insideBottom"}}/>
            <YAxis label = {{value: "Hours", angle: -90, position: "insideLeft"}}/>
            <Tooltip />
            <Bar dataKey="pv" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
        </BarChart>;

    return <>
        <nav>
            <Link to="/login">Login Page  &nbsp; | </Link> &nbsp; &nbsp;
            <Link to="/projects">Projects &nbsp; | </Link> &nbsp; &nbsp;
            <Link to="/view">Project View: {activeProjectId} &nbsp; | </Link> &nbsp; &nbsp;
            <Link to="/teamView">Team View</Link>
        </nav>
        <h1>{activeProfile.name}'s Effort Graph</h1>
        {barChart}
    </>
};

export default EffortGraph;