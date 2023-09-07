interface TaskProps {
    name : string
    taskType : string
    description : string
    priority : string
    tag : string
    member : string
    status : string
    stage : string
}

function InputList() {
    return (
    <><div>
        
        <div className="row">
            <div className="col"></div>

                <div className="col-6">
                    <h1> Create new Task </h1>
                    <div className="input-group mb-3 mt-5">
                        <span className="input-group-text" id="input-name">Name</span>
                        <input type="text" className="form-control" placeholder="Name" aria-label="Name" aria-describedby="input-name" />
                    </div>

                    <div className="input-group mb-3">
                        <label className="input-group-text" htmlFor="inputGroupSelect01">Task Type</label>
                        <select className="form-select" id="inputGroupSelect01">
                            <option selected>Choose...</option>
                            <option value="1">User Story</option>
                            <option value="2">Bug</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows={3}></textarea>
                    </div>

                    <div className="input-group mb-3">
                        <label className="input-group-text" htmlFor="inputGroupSelect01">Priority</label>
                        <select className="form-select" id="inputGroupSelect01">
                            <option selected>Choose...</option>
                            <option value="1">Low</option>
                            <option value="2">Medium</option>
                            <option value="3">Important</option>
                            <option value="4">Urgent</option>
                        </select>
                    </div>

                    <div className="input-group mb-3">
                        <label className="input-group-text" htmlFor="inputGroupSelect01">User Story Tag</label>
                        <select className="form-select" id="inputGroupSelect01">
                            <option selected>Choose...</option>
                            <option value="1">Frontend</option>
                            <option value="2">Backend</option>
                            <option value="3">API</option>
                            <option value="4">Framework</option>
                            <option value="5">Testing</option>
                            <option value="6">UI</option>
                            <option value="7">UX</option>
                            <option value="8">Database</option>
                        </select>
                    </div>

                    <div className="input-group mb-3">
                        <label className="input-group-text" htmlFor="inputGroupSelect01">Assign To</label>
                        <select className="form-select" id="inputGroupSelect01">
                            <option selected>Choose...</option>
                            <option value="1"></option>
                        </select>
                    </div>
                    
                    <div className="input-group mb-3">
                        <label className="input-group-text" htmlFor="inputGroupSelect01">Task Status</label>
                        <select className="form-select" id="inputGroupSelect01">
                            <option selected>Choose...</option>
                            <option value="1">Not Started</option>
                            <option value="2">In Progress</option>
                            <option value="3">Completed</option>
                        </select>
                    </div>

                    <div className="input-group mb-3">
                        <label className="input-group-text" htmlFor="inputGroupSelect01">Task Stage</label>
                        <select className="form-select" id="inputGroupSelect01">
                            <option selected>Choose...</option>
                            <option value="1">Planning</option>
                            <option value="2">Development</option>
                            <option value="3">Testing</option>
                            <option value="4">Integration</option>
                        </select>
                    </div>

                    <button type="button" className="btn btn-primary me-md-2">Cancel</button>
                    <button type="button" className="btn btn-primary" onClick={ () => }>Save</button> 

                </div>



            <div className="col"></div>
        </div>
    </div></>



    )

}

export default InputList