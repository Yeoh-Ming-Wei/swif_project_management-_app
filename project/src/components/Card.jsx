  const Card = ({id, title, taskStage, priority, storyPoint}) => {

    const classes = (priority) => {
      switch(priority) {
        case "Urgent": 
          return "card text-bg-danger mb-3"
        case "Important":
          return "card text-bg-warning mb-3"
        case "Medium": 
          return "card text-bg-success mb-3"
        default: 
          return "card"
      }
    }

    return (
      <div id={id} className={classes(priority)} style={{width: '18rem'}}>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{taskStage}</p>
          <p className="card-text" align="right">{storyPoint}</p>
        </div>
      </div>
    )
}

export default Card
