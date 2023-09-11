import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <> | </> 
        <Link to="/projects">Projects</Link>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;
