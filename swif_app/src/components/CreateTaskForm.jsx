import InputDropdown from "./InputDropdown";
import InputTextArea from "./InputTextArea";

const taskTypeSelection = ["User Story", "Bug"];
const prioritySelection = ["Low", "Medium", "Important", "Urgent"];
const storyTagSelection = ["Frontend", "Backend", "API", "Framework", "Testing", "UI", "UX", "Database"];
const storyPointSelection = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
const taskStageSelection = ["Planning", "Development", "In Progress", "Completed"];
   

const CreateTaskForm = ({usage, buttonFunc, task, members = []}) => {
    const t = (task == undefined) ? [""] * 9 : Object.values(task)
    return (

        <div className="create-task-form">
            <div className="row">
            <div className="col"></div>

            <div className="create-task-items"></div>
        <div className="create-task-items">
            <InputTextArea id = {usage + "Name"} name="Name" rows="1" value={t[1]}/>
            {/* default to user story */}
            <InputDropdown id = {usage + "TaskType"} name="Task Type" selection={taskTypeSelection} value={t[2]}/>
            <InputTextArea id = {usage + "Desc"} name="Description" value={t[3]}/>
            <InputDropdown id = {usage + "Priority"} name="Priority" selection={prioritySelection} value={t[4]}/>
            <InputDropdown id = {usage + "Tag"} name="User Story Tag" selection={storyTagSelection} value={t[5]}/>
            <InputDropdown id = {usage + "StoryPoints"} name="Story Points" selection={storyPointSelection} value={t[6]}/>
            <InputDropdown id = {usage + "AssignTo"} name="Assign To" selection={members.map((member) => member.name)} value={t[7]}/>
            <InputDropdown id = {usage + "TaskStage"} name="Task Stage" selection={taskStageSelection} value={t[8]}/>
            <button type="button" className="btn btn-primary" onClick={buttonFunc}>Save</button>
        </div>
            <div className="col"></div>
            </div>
        </div>
    )
}

export default CreateTaskForm