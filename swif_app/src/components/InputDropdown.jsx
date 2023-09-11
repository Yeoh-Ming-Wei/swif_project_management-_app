function InputDropdown({name, selection}){
    return (
    <div className="mb-3">

        <label htmlFor={"input" + name} className="col-sm-2 col-form-label">
            {name}
        </label>

        <select className="form-select" id={name}>
            <option selected>Choose...</option>
            {selection.map((selection ,index) => (
                <option value={index}> {selection}</option>
            ))}
            
        </select> 
    </div>
    )

}

export default InputDropdown