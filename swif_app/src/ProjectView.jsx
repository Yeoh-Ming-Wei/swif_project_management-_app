import { MdList } from "react-icons/md";

const getState = () => {
    const storedState = JSON.parse(localStorage.getItem("state")); // converting from string to object
    if (storedState) {
      console.log("stored state found, restoring", storedState);
      return storedState;
    } else {
      console.log("no state found, initialising state", INITIAL_STATE);
      return INITIAL_STATE;
    }
};

const getActiveProject = () => {
    // looks for active project in project array
    const match = (getState().projects.find((x)=> {
        return (x.id == getState().activeProject)
    }))
    if (match === undefined) {
        console.log("no match found");
        return {id: "no active project found"}
    }
    return match
}

const ProjectView = () => {
    return (
        <>
            <h1>Project View</h1>
            {JSON.stringify(getState())}
            <h2>Project Name: {getActiveProject().id}</h2>
            <div display={"flex"} flex-direction={"row"}>
                <button type="button" className="button">
                    <div><MdList size={36} /></div>
                    <div>Product Backlog</div>
                </button>
            </div>
        </>
    )
}

export default ProjectView