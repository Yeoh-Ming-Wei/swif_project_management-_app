interface Input {
    name : string
}

function InputList({ name } : Input) {
    return (
    <div>
        <div className="mb-3 row">
        <label htmlFor={name} className="col-sm-2 col-form-label">
            {name}
        </label>
        <div className="col-sm-10">
            <input type="text" className="form-control" id={name}/>
        </div>
        
        </div>
    </div>
    )

}

export default InputList