function InputTextArea({name, rows = 1}) {
    return (
    <div>
        <div className="mb-3">
        <label htmlFor={name} className="form-label">{name}</label>
        <textarea className="form-control" id={name} rows={rows}></textarea>
        </div>
    </div>
    )
}

export default InputTextArea
