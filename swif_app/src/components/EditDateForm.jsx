const EditDateForm = ({task, buttonFunc}) => {
    return (
        <>
            <label>
                Enter sprint start date: <input
                type = "datetime-local"
                id = "taskStartTime"
                value = {task.startDate}
                />
            </label>
            <br />
            <label>Enter sprint end date: <input
                type = "datetime-local"
                id = "taskEndTime"
                value = {task.endDate}
                />
            </label>
            <div>
                <button type="button" className="btn btn-primary" onClick={buttonFunc}>Save</button>
            </div>
            
        </>
        
        
    )
}

export default EditDateForm

