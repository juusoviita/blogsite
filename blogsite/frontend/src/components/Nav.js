import { Link } from 'react-router-dom'

function Nav() {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-style">
        <p>Logo</p>
      </Link>
      <Link to="/" className="nav-style" style={{marginLeft: 40}}>
        <h3>BlogSite</h3>
      </Link>

      <ul className="nav-links">
        <Link to="/login" className="nav-style">
          <li>Log in</li>
        </Link>
        <Link to="/register" className="nav-style">
          <li>Register</li>
        </Link>
      </ul>
    </nav>
  );
}

export default Nav;