import { useState, useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

const INITIAL_STATE = {
  testCount: 0,
}

// useful reference: https://www.freecodecamp.org/news/how-to-use-localstorage-with-react-hooks-to-set-and-get-items/
function App () {
  const getState = () => {
    const storedState = JSON.parse(localStorage.getItem("state")); // converting from string to object
    if (storedState) {
      console.log("stored state found, restoring", storedState)
      return storedState
    } else {
      return INITIAL_STATE;
    }
  }

  // initialise using stored state, if any, or the intial state otherwise
  const [state, setState] = useState(getState());

  // runs whenever state changes
  useEffect(() => {
    console.log("writing state to local storage", state)
    localStorage.setItem("state", JSON.stringify(state)); // convert to string before storing
  }, [state]);

  // test component to display state values
  const display = getState() ? state.testCount : ""

  return (
    <>
      <h2>{display}</h2>
      <button onClick={() => setState({state, testCount: state.testCount + 1})}> update state </button>
      <button onClick={() => setState(INITIAL_STATE)}> reset </button>
      <button onClick={() => localStorage.clear()}> clear </button>
    </>
  );
}
export default App