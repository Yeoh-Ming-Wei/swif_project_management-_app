import { useState } from "react"
import Card from "./components/Card"
import InputDropdown from "./components/InputDropdown."
import InputList from "./components/InputList"
import InputTextArea from "./components/InputTextArea"



const taskTypeSelection = ["User Story", "Bug"]
const prioritySelection = ["Low", "Medium", "Important", "Urgent"]
const storyTagSelection = ["Frontend", "Backend", "API", "Framework", "Testing", "UI", "UX", "Database"]
const storyPointSelection = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
const taskStageSelection = ["Planning", "Development", "In Progress", "Completed"]

let taskID = 0
const elementValue = (str) => document.getElementById(str).value

const CreateTask = () => {                                      

    const [task, setTask] = useState([])
    const [taskCreating, setTaskCreating] = useState(false)
    const [taskEditing, setTaskEditing] = useState(-1)

    const collectData = () => {
    
        const taskObj = {
            id : taskID,
            name : elementValue("inputName"),
            tasktype : elementValue("inputTaskType"),
            description :  elementValue("inputDesc"),
            priority : elementValue("inputPriority"),
            tag : elementValue("inputTag"),
            storyPoint : elementValue("inputSP"),
            member : elementValue("inputMember"), 
            taskstage : elementValue("inputTask")
        }
        task.length == 0 ? setTask([taskObj]) : setTask(task.concat(taskObj))
        taskID++
        setTaskCreating(false)
        console.log(task)
    }

    const saveEdit = (taskId) => {
        const updateTask = [...task].map((t) => {
            console.log(t.id)
            if (t.id === taskId) {
                t.name = elementValue("editName")
                t.tasktype = elementValue("editTaskType")
                t.description =  elementValue("editDesc")
                t.priority = elementValue("editPriority")
                t.tag = elementValue("editTag")
                t.storyPoint = elementValue("editSP")
                t.member = elementValue("editMember")
                t.taskstage = elementValue("editTask")
            }
            return t
        })
        setTask(updateTask)
        
        setTaskEditing(null)   
    }

    return (
        <><div>
        <div className="row">
            <div className="col"></div>

            <div className="col-6">
                {taskCreating === false ? (
                <>
                    <button type="button" className="btn btn-primary me-md-2 mb-3" onClick={() => setTaskCreating(true)}>Create New Task </button>
                    <hr /> 
                </>
                    
                ) : (
                <>
                    <h1> Create new Task </h1>
                    <InputList id = "inputName" name = "Name" />
                    <InputDropdown id = "inputTaskType" name = "Task Type" selection = {taskTypeSelection}/> 
                    <InputTextArea id = "inputDesc" name = "Description" />
                    <InputDropdown id = "inputPriority" name = "Priority" selection = {prioritySelection}/>
                    <InputDropdown id = "inputTag"name = "User Story Tag" selection = {storyTagSelection}/>
                    <InputDropdown id = "inputSP" name = "Story Point" selection = {storyPointSelection}/>     
                    <InputDropdown id = "inputMember" name = "Assign To" selection = {[]}/>
                    <InputDropdown id = "inputTask" name = "Task Stage" selection = {taskStageSelection}/>

                    <button type="button" className="btn btn-primary me-md-2" onClick={() => setTaskCreating(false)}>Cancel</button>
                    <button type="button" className="btn btn-primary" onClick={() => collectData()}>Save</button> 
                    <hr className="mb-3"/>  
                </>)}
                
                {task.map(t => (    
                    
                    <>
                        {taskEditing === t.id ? (
                        <> 
                            
                            <InputList id = "editName" name = "Name" value = {t.name}/>
                            <InputDropdown id = "editTaskType" name = "Task Type" selection = {taskTypeSelection} value = {t.tasktype}/> 
                            <InputTextArea id = "editDesc" name = "Description" value = {t.description}/>
                            <InputDropdown id = "editPriority" name = "Priority" selection = {prioritySelection} value = {t.priority}/>
                            <InputDropdown id = "editTag"name = "User Story Tag" selection = {storyTagSelection} value = {t.tag}/>
                            <InputDropdown id = "editSP" name = "Story Point" selection = {storyPointSelection} value = {t.storyPoint}/>     
                            <InputDropdown id = "editMember" name = "Assign To" selection = {[]} value = {t.member}/>
                            <InputDropdown id = "editTask" name = "Task Stage" selection = {taskStageSelection} value = {t.taskstage}/>
                            
                            <button type="button" className="btn btn-primary" onClick={() => saveEdit(t.id)}>Save</button> 
                        </>
                                                    
                        ) : (
                        <>
                            <Card 
                                id = {"card" + t.id}
                                title = {t.name} taskStage={taskStageSelection[t.taskstage]} 
                                priority={prioritySelection[t.priority]} 
                                storyPoint={storyPointSelection[t.storyPoint]}
                                key = "" />
                            <a href="#" className="card-link" onClick= {() => setTaskEditing(t.id)}>Edit</a>
                            <a href="#" className="card-link" onClick={() => {
                                setTask(task.filter(tfilter => tfilter.id != t.id))
                            }}>Remove</a>
                        </>
                        )}

                    </>
                ))}
            </div>
            <div className="col"></div>

        </div>


        </div></>
    )
}

export default CreateTask