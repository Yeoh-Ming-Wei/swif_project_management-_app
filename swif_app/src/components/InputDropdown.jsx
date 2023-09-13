function InputDropdown({name, selection, value}){
    return (
    <div className="mb-3">

        <label htmlFor={"input" + name} className="col-sm-2 col-form-label">
            {name}
        </label>

        <select className="form-select" id={name} defaultValue = {value}>
            <option selected>Choose...</option>
            {selection.map((selection ,index) => (
                <option key={"name" + index} value={index}> {selection}</option>
            ))}
            
        </select> 
    </div>
    )

}

export default InputDropdown