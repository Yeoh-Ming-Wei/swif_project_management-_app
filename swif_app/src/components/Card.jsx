  const Card = ({id, title, taskStage, priority, storyPoint}) => {

    const bgColours = (priority) => {
      switch(priority) {
        case "Urgent": 
          return "red"
        case "Important":
          return "yellow"
        case "Medium": 
          return "yellowgreen"
        case "Low": 
          return "lightgreen"
        default: 
          return "white"
      }
    }

    const textColours = (priority) => {
      switch(priority) {
        case "Urgent": 
          return "white"
        case "Important":
          return "black"
        case "Medium": 
          return "black"
        case "Low": 
          return "black"
        default: 
          return "white"
      }
    }

    return (
      <div id={id} className={"card mb-3"}  style={{width: '18rem', backgroundColor: bgColours(priority), color: textColours(priority), borderRadius: "20px"}}>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{taskStage}</p>
          <p className="card-text" align="right">{storyPoint}</p>
        </div>
      </div>
    )
}

export default Card
