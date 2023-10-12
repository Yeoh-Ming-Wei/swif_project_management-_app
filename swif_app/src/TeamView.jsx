const TeamView = () => {

    function createUserAccount(id, profilePicture, name, password, accountType) {
        return {
            id: id,
            profilePicture: profilePicture,
            name: name,
            password: password,
            accountType: accountType
        };
    }
    const accounts = [
        createUserAccount(1, "Profile1", "Alice", "Password1", "Member"),
        createUserAccount(2, "Profile2", "Ben", "Password2", "Member"),
        createUserAccount(3, "Profile3", "Carol", "Password3", "Member"),
        createUserAccount(4, "Profile4", "Dennis", "Password4", "Admin")
    ];

    const createAccountCard = () => {
        const Card = ({id, profilePicture, name, password, accountType}) => {

        return (
            <div id={id} className={"card"} draggable="true" onDrag = {onDragFunction} onDragEnd = {dragEnd} style={{width: '18rem', height: '10rem', margin: "10px", padding: "10px", backgroundColor: bgColours(priority), color: "black", borderRadius: "16px"}}>
                <div className="card-body" style={{display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
                    <h3 className="card-title" align="left">{name}</h3>
                    <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                        <p className="card-text" align="left">{accountType}</p>
                    </div>
                    <div style={{display:"flex", flexDirection:"row", justifyContent:"end"}}>
                        <button onClick={editFunction}>Edit</button>
                        <button onClick={deleteFunction}>Delete</button>
                    </div>
                </div>
            </div>
            )
        }
    }

    const MemberDisplay = () => accounts.maps(createUserAccount);

    return (<>
        <h1>Team Members</h1>
        {MemberDisplay}
        {createSprintPopup()}
    </>);

}