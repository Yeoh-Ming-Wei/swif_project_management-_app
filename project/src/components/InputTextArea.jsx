
function InputTextArea({ id, name, value }) {
    return (
    <div>
        <div className="mb-3">
        <label htmlFor={name} className="form-label">{name}</label>
        <textarea className="form-control" id={id} rows={3} defaultValue = {value}></textarea>
        </div>
    </div>
    )
}

export default InputTextArea
