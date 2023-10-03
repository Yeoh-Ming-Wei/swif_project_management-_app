import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend, Tooltip} from 'recharts';
import SprintBoard from './SprintBoard';

const BurndownChart = () => {
  const activeSprintName = JSON.parse(localStorage.getItem("activeSprint"));
  const projects = JSON.parse(localStorage.getItem("projects"));
  const activeProjectId = projects.activeProject;
  const activeProject = projects.projects.find((project) => {return project.id == activeProjectId});
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
  console.log('sprint duration', durationDays)

  let burndownData = [];

  const createDataObject = (name, value1, value2) => {
    return ({
      name: name,
      actual: value1,
      expected: value2,
    });
  }

  const startingStoryPoints = activeSprintBacklog.reduce(
    ((acc, task) => {
      console.log('accumulating story points', acc, task);
      if (!(parseInt(task.storyPoints) >= 0)) {
        return acc;
      }
      const storyPoints = parseInt(task.storyPoints) + 1;
      return acc + storyPoints;
    }), 0
  )

  for (let i = 0; i <= durationDays; i++) {
    console.log("day", i)
    const newDate = new Date(startDate.getTime() + (i * (86400000))) // a day in ms
    const completedStoryPoints = activeSprintBacklog.filter(
      (task) => {
        return task.taskStage == "3";
      }
    ).reduce(
      (acc, task) => {
        const taskEndDate = new Date (task.endDate)
        if ((taskEndDate <= newDate) && (parseInt(task.storyPoints)) >= 0) {
          // console.log(task)
          return acc + parseInt(task.storyPoints) + 1;
        } else {
          return acc
        }
      }, 0
    )
    const remainingStoryPoints = startingStoryPoints - completedStoryPoints
    const expectedRemainingStoryPoints = startingStoryPoints - ((startingStoryPoints / durationDays) * i)
    burndownData.push(createDataObject(newDate.toUTCString().slice(0, -18), remainingStoryPoints, expectedRemainingStoryPoints));
  }

  const renderLineChart = (
    <LineChart width={1000} height={500} data={burndownData}>
      <Line type="monotone" dataKey="actual" stroke="#8884d8" />
      <Line type="monotone" dataKey="expected" stroke="#82ca9d" />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="name" label={{value: "Date", offset:-5, position: "insideBottom"}} />
      <YAxis label={{value: "Story Points", angle: -90, position: "insideLeft"}}/>
      <Legend />
      <Tooltip />
    </LineChart>
  )

  return (
    <>
      <h1>Burndown Chart</h1>
      {/* {JSON.stringify(activeSprint)}<br/> */}
      {/* {durationDays} days <br/> */}
      {renderLineChart}
    </>
  );
};
  
export default BurndownChart