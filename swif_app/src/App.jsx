import { useState, useEffect } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import Home from "./Home";
import Projects from "./Projects";
import ProjectView from "./ProjectView";
import MissingPage from "./MissingPage";
import ProductBacklog from './ProductBacklog';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// useful reference: https://www.freecodecamp.org/news/how-to-use-localstorage-with-react-hooks-to-set-and-get-items/
function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="">Home</Link>
        <> | </> 
        <Link to="projects">Projects</Link>
      </nav>
      <Routes>
          <Route index element={<Home />} />
          <Route path="projects" element={<Projects />} />
          <Route path="view" element={<ProjectView />} />
          <Route path="product-backlog" element={<ProductBacklog />} />
          <Route path="*" element={<MissingPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
