import { useState, useEffect } from 'react';
import CreateTaskForm from './components/CreateTaskForm';
import { MdAddBox } from "react-icons/md";
import Popup from 'reactjs-popup';
import Card from './components/Card';

const ProductBacklog = () => {
    
    const p = JSON.parse(localStorage.getItem("projects"))
    const activeP = p.projects.find(project => project.id == p.activeProject);
    const projectTeam = activeP.team;

    const restoreTask = () => {
        console.log("Restoring Task")
        return activeP.tasks
    };

	const [taskId, setTaskId] = useState(JSON.parse(localStorage.getItem("taskId")) || 1);
    const [tasks, setTasks] = useState(restoreTask());
    const [taskManager, setTaskManager] = useState(-1);
    const [sort, setSort] = useState(0);
    const [filter, setFilter] = useState([]);

    const storyTagSelection = ["Frontend", "Backend", "API", "Framework", "Testing", "UI", "UX", "Database"];

	useEffect(() => {
        // Save the task id to localStorage whenever it changes
        localStorage.setItem('taskId', taskId);
    }, [taskId]);


    useEffect(() => {
        console.log("updating tasks to local storage", tasks);
        activeP.tasks = tasks
        p.projects.map(project => {
            if (project.id == activeP.id){
                project = activeP
            }
            return project
        })
        localStorage.setItem("projects", JSON.stringify(p)); // convert to string before storing
        console.log(p)
    }, [tasks]);

    const manageTask = (num) => {
        const elementValue = (str) => (document.getElementById(str).value);
        const t = {
            id: num > 0 ? num : taskId,
            name: elementValue("Name"),
            taskType: elementValue("Task Type"),
            description: elementValue("Description"),
            priority: elementValue("Priority"),
            tag: elementValue("User Story Tag"),
            storyPoints: elementValue("Story Points"),
            member: elementValue("Assign To"),
            taskStage: elementValue("Task Stage"),
        }
        // For adding new task
        if (num == 0) {
            console.log('saving task',t);
            // update state with new task
            setTasks(tasks.concat(t));
            // increment ID
            setTaskId(taskId + 1)
        }

        // For editing task 
        if (num > 0) {
            const taskBeingEditedIndex = tasks.findIndex((task) => { return(task.id === taskManager);});
            // modify tasks and update
            let tasksMutable = tasks.map(x => x); // map does nothing
            tasksMutable[taskBeingEditedIndex] = t;
            setTasks(tasksMutable);
            // stop editing and close popup
            
        }
        setTaskManager(-1);
    }

    const CreateTask = () => {
    
        const [open, setOpen] = useState(false);
        const createTaskPopup = () => {
        const closeModal = () => setOpen(false);

        return (
            <div>
                <button type="button" className="button" onClick={() => setOpen(o => !o)} >
                    <div><MdAddBox size={36} /></div>
                    <div>Create New Task</div>
                </button>
                <Popup open={open} closeOnDocumentClick onClose={closeModal}>
                    <div className="modal">
                        <a className="close" onClick={closeModal}>&times;</a>
                        <CreateTaskForm buttonFunc = {() => manageTask(0)} members = {projectTeam}/>
                    </div>
                </Popup>
            </div>
        );
    };

        return createTaskPopup();  
    };

	const EditTask = () => {

		const taskBeingEditedIndex = tasks.findIndex((task) => { return(task.id === taskManager );});
		const taskBeingEdit = (taskBeingEditedIndex != -1) ? tasks[taskBeingEditedIndex] : {};

        const editTaskPopup = () => {
        const closeModal = () => setTaskManager(-1);
        return (
            <div>
                <Popup open={(taskManager != -1)} closeOnDocumentClick onClose={closeModal}>
                    <div className="modal">
                        <a className="close" onClick={closeModal}>&times;</a>
                        <CreateTaskForm usage = "edit" buttonFunc = {() => manageTask(taskBeingEdit.id)} task={taskBeingEdit} members = {projectTeam}/>
                    </div>
                </Popup>
            </div>
        );
        };
    
        return editTaskPopup();  
    };

    const sortFunction = (num) => {
        if (num == 1) {
            const sorted = tasks.toSorted((a, b) => parseInt(b.priority) - parseInt(a.priority))
                setTasks(sorted)
                setSort(1)
        } else {
            const sorted = tasks.toSorted((a, b) => a.id - b.id)
            setTasks(sorted)
            setSort(0)
        }
    }

    const orderByFunction = (num) => {
        if (num == 1) {
            const sorted = (sort == 1 ? tasks.toSorted((a, b) => parseInt(b.priority) - parseInt(a.priority)) : tasks.toSorted((a, b) => a.id - b.id))
			setTasks(sorted)
        } else {
            const sorted = (sort == 1 ? tasks.toSorted((a, b) => parseInt(a.priority) - parseInt(b.priority)) : tasks.toSorted((a, b) => b.id - a.id))
			setTasks(sorted)
        }
    }

    return (
        <>
            <h1>Product Backlog</h1>
            <hr />
			<CreateTask />
			<EditTask />
            {tasks.length != 0 ? <div style={{display:"flex", flexDirection:"row", justifyContent:"center", }}>
				<p> Sort By: </p>
				<button type="button" className="btn btn-primary mb-3 me-1" onClick={() => sortFunction(1)}>Priority</button>
				<button type="button" className="btn btn-primary mb-3 me-5" onClick={() => sortFunction(0)}>Date</button>

				<p> Order by: </p>
				<button type="button" className="btn btn-secondary mb-3 me-1" onClick={() => orderByFunction(1)}>↑</button>
				<button type="button" className="btn btn-secondary mb-3 me-1" onClick={() => orderByFunction(0)}>↓</button>
            </div> : <></>}
			<div style={{display:"flex", flexDirection:"row", justifyContent:"center"}}>
                {tasks.length != 0 ? (
                <>  
                    <p> Filter By: {filter.map(tag => tag + " ")} </p>
                    {storyTagSelection.map((tag) => <button type="button" className="btn btn-primary mb-3 me-1" key="" onClick= {() => {
                        !filter.includes(tag) ? setFilter(filter.concat(tag)) : setFilter(filter.filter(tagFilter => tagFilter != tag))
                      
                    }}>{tag}</button>)}

                </>   
                ) : (<></>)}
			</div>
              
			{tasks.filter(tFilter => filter.length == 0 || filter.includes(storyTagSelection[tFilter.tag])).map(t => (    
            <Card 
                task = {t}
                key = {t.id}
                editFunction={() => setTaskManager(t.id)}
                deleteFunction={() => setTasks(tasks.filter(tfilter => tfilter.id != t.id))}
            />
            ))}
        </>
    )
};

export default ProductBacklog;
