const Card = ({id, title, taskStage, priority, storyPoints, editFunction, deleteFunction}) => {

    const bgColours = (priority) => {
      switch(priority) {
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
        <div id={id} className={"card"}  style={{width: '18rem', height: '10rem', margin: "10px", padding: "10px", backgroundColor: bgColours(priority), color: "black", borderRadius: "16px"}}>
            <div className="card-body" style={{display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
            <h3 className="card-title" align="left">{title}</h3>
            
            <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                <p className="card-text" align="left">{taskStage}</p>
                <h3 className="card-text" align="right">{storyPoints}</h3>
            </div>
            <div style={{display:"flex", flexDirection:"row", justifyContent:"end"}}>
                <button onClick={editFunction}>Edit</button>
                <button onClick={deleteFunction}>Delete</button>
                
            </div>
            
            </div>
            
        </div>
    )
}

export default Card ;