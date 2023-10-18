const FunctionalButton = ({text, func}) => {
    return (
        <button 
            type="button" 
            className="functional-button" 
            onClick={func} >
            {text}
        </button>
        
    )
}

export default FunctionalButton ;