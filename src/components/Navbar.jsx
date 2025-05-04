import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="main-navbar">
      <div className="logo">
        The Movies Shop
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/" className={pathname === '/' ? 'active' : ''}>Home</Link>
        </li>
        <li>
          <Link to="/favorites" className={pathname === '/favorites' ? 'active' : ''}>Favorites</Link>
        </li>
      </ul>
    </nav>
  );
}
