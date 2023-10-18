const Card = ({task, editFunction, deleteFunction, onDrag, onDragEnd}) => {
    const prioritySelection = ["Low", "Medium", "Important", "Urgent"];
    const storyPointSelection = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
    const taskStageSelection = ["Planning", "Development", "In Progress", "Completed"];

    const bgColours = (priority) => {
      switch(prioritySelection[priority]) {
        case "Urgent": 
            return "Salmon"
        case "Important":
            return "Khaki"
        case "Medium": 
            return "PaleGreen"
        case "Low": 
            return "White"
        default: 
            return "Gray"
      }
    }

    return (
        <div 
            id={task.id} 
            className={"card"}  
            draggable = {!!(onDrag !== undefined && onDragEnd !== undefined)}
            onDrag={onDrag}
            onDragEnd={onDragEnd}
            style={{width: '18rem', height: '10rem', margin: "10px", padding: "10px", backgroundColor: bgColours(task.priority), color: "black", borderRadius: "16px"}}
        >
            <div className="card-body" style={{display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
            <h3 className="card-title" align="left">{task.name}</h3>
            
            <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                <p className="card-text" align="left">{taskStageSelection[task.taskStage]}</p>
                <h3 className="card-text" align="right">{storyPointSelection[parseInt(task.storyPoints)]}</h3>
            </div>
            <div style={{display:"flex", flexDirection:"row", justifyContent:"end"}}>
                {editFunction !== undefined ? <button onClick={editFunction}>Edit</button> : <></>}
                {deleteFunction !== undefined ? <button onClick={deleteFunction}>Delete</button> : <></>} 
            </div>
            
            </div>
            
        </div>
    )
}

export default Card ;