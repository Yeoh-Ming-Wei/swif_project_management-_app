interface Input {
    name : string
}


function InputTextArea({ name } : Input) {
    return (
    <div>
        <div className="mb-3">
        <label htmlFor={name} className="form-label">{name}</label>
        <textarea className="form-control" id={name} rows={3}></textarea>
        </div>
    </div>
    )
}

export default InputTextArea
