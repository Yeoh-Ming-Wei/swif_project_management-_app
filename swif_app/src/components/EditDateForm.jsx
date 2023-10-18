const EditDateForm = ({task, buttonFunc}) => {
    return (
        <>
            <label>
                Enter task start date:
                <input
                    type = "datetime-local"
                    id = "taskStartTime"
                    defaultValue = {task.startDate}
                />
            </label>
            <br />
            <label>
                Enter task end date:
                <input
                    type = "datetime-local"
                    id = "taskEndTime"
                    defaultValue = {task.endDate}
                />
            </label>
            <div>
                <button type="button" className="btn btn-primary" onClick={buttonFunc}>Save</button>
            </div>
        </>    
    )
}

export default EditDateForm

