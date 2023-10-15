// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Projects from "./Projects";
import ProjectView from "./ProjectView";
import TeamView from "./TeamView";
import MissingPage from "./MissingPage";
import ProductBacklog from './ProductBacklog';
import SprintView from "./SprintView";
import Team from './Team';
import SprintBoard from "./SprintBoard";
import BurndownChart from "./BurndownChart";

// useful reference: https://www.freecodecamp.org/news/how-to-use-localstorage-with-react-hooks-to-set-and-get-items/
function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <Link to="projects">Projects</Link>
        </nav>
        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-evenly"}}>
          Adjust font size:
          <div>
            <button 
              type="button" 
              className="button" 
              onClick={() => {
                const currentFontSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('font-size').slice(0,-2));
                document.documentElement.style.setProperty('font-size', (currentFontSize - 2) + "px");
              }}
            >
              -
            </button>
            &nbsp;
            <button 
              type="button" 
              className="button" 
              onClick={() => {
                const currentFontSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('font-size').slice(0,-2));
                document.documentElement.style.setProperty('font-size', (currentFontSize + 2) + "px");
              }}
            >
              +
            </button>
          </div>
        </div>
      </div>

      <Routes>
          <Route index element={<Projects />} />
{/*           <Route index element={<TeamView />} /> */}
          <Route path="projects" element={<Projects />} />
          <Route path="TeamView" element={<TeamView />} />
          <Route path="view" element={<ProjectView />} />
          <Route path="product-backlog" element={<ProductBacklog />} />
          <Route path="sprints" element={<SprintView />} />
          <Route path="sprint_board" element={<SprintBoard />} />
          <Route path="burndown_chart" element={<BurndownChart />} />
          <Route path="team" element={<Team />} />
          <Route path="*" element={<MissingPage />} />
      </Routes>
      
    </BrowserRouter>
  );
}
export default App;
