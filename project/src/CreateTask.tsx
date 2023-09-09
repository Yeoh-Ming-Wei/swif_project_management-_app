import InputDropdown from "./components/InputDropdown"
import InputList from "./components/InputList"
import InputTextArea from "./components/InputTextArea"

const taskTypeSelection = ["User Story", "Bug"]
const prioritySelection = ["Low", "Medium", "Important", "Urgent"]
const storyTagSelection = ["Frontend", "Backend", "API", "Framework", "Testing", "UI", "UX", "Database"]
const taskStageSelection = ["Planning", "Development", "In Progress", "Completed"]


let taskID = 0
const elementValue = (str : string) => (document.getElementById(str) as HTMLInputElement).value

const collectData = () => {
    const task = {
        id : taskID,
        name : elementValue("Name"),
        tasktype : elementValue("Task Type"),
        description :  elementValue("Description"),
        priority : elementValue("Priority"),
        tag : elementValue("User Story Tag"),
        member : elementValue("Assign To"), 
        taskstage : elementValue("Task Stage")
    }
    
    console.log(task)
    taskID++

}   
const CreateTask = () => {
    return (
        <><div>
        <div className="row">
            <div className="col"></div>

            <div className="col-6">
                <h1> Create new Task </h1>
                <InputList name = "Name"/>
                <InputDropdown name = "Task Type" selection = {taskTypeSelection}/> 
                <InputTextArea name = "Description" />
                <InputDropdown name = "Priority" selection = {prioritySelection}/>
                <InputDropdown name = "User Story Tag" selection = {storyTagSelection}/>
                <InputDropdown name = "Assign To" selection = {[]}/>
                <InputDropdown name = "Task Stage" selection = {taskStageSelection}/>

                <button type="button" className="btn btn-primary me-md-2">Cancel</button>
                <button type="button" className="btn btn-primary" onClick={() => collectData()}>Save</button> 

            </div>
            <div className="col"></div>


        </div>


        </div></>
    )
}

export default CreateTask