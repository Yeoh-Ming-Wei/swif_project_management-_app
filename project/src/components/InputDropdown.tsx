interface Input {
    name : string
    selection : string[]
}

const selectMap = (selection : string[]) => {

}

function InputDropdown({ name , selection = []} : Input) {
    return (
    <div className="mb-3">

        <label htmlFor={"input" + name} className="col-sm-2 col-form-label">
            {name}
        </label>

        <select className="form-select" id={name}>
            <option selected>Choose...</option>
            {selection.map((selection ,index) => (
                <option key={"name"} value={index}> {selection}</option>
            ))}
            
        </select> 
    </div>
    )

}

export default InputDropdown