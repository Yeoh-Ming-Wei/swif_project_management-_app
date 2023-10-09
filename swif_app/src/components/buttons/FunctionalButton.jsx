const FunctionalButton = ({text, func}) => {
    return (
        <button 
            type="button" 
            className="button" 
            onClick={func} >
            {text}
        </button>
        
    )
}

export default FunctionalButton ;