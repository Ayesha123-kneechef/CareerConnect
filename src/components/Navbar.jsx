import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="brand">
        Career<span>Connect</span>
      </Link>

      <div className="nav-links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/saved">Saved Jobs</NavLink>
        <NavLink to="/applied">My Applications</NavLink>
      </div>
    </nav>
  );
}