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

    const createAccountCard = (id, name, password, accountType) => {
        return (
            <div id={id} className={"card"} style={{width: '18rem', height: '10rem', margin: "10px", padding: "10px", backgroundColor: "white", color: "black", borderRadius: "16px"}}>
                <div className="card-body" style={{display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
                    <h3 className="card-title" align="left">{name}</h3>
                    <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                        <p className="card-text" align="left">{accountType}</p>
                    </div>
                    <div style={{display:"flex", flexDirection:"row", justifyContent:"end"}}>
                        <button>Edit</button>
                        <button>Delete</button>
                    </div>
                </div>
            </div>
        )
    }

    const MemberDisplay = () => {
        return accounts.map(( account) => {
            console.log(account)
            return createAccountCard(account.id, account.name, account.password, account.accountType);
        });

    }

    return (<>
        <h1>Team Members</h1>
        {MemberDisplay()}
    </>);

}

export default TeamView;