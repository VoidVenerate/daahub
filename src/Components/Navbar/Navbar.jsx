import React from 'react'
import './Navbar.css'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import DarkTheme from '../DarkTheme/DarkTheme'
import { Search } from 'lucide-react'

const Navbar = ({ onSearch }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState('');

  const toggleMenu = () => {
    setMenuOpen((prev) => {
      const newState = !prev;
      if (newState) {
        document.body.classList.add('menu-open');
      } else {
        document.body.classList.remove('menu-open');
      }
      return newState;
    });
  };
  const handleSearch = (e) => {
    setQuery(e.target.value)
  }
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (query.trim() === '') return;
    onSearch(query);
    setMenuOpen(false); // Close menu on search (for mobile)
  }
  return (
    <nav className="navbar">
      <div className="navbar-header">
        <div className="navbar-logo">
          <NavLink to='/home'>
            <p style={{fontFamily:'Rushon Ground'}}>DaaHub</p>
          </NavLink>
        </div>

        <div className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>



      <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
        <li>
          <NavLink
            to="/home"
            exact="true"
            className={({ isActive }) => (isActive ? 'navbar-link active' : 'navbar-link')}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/category/health"
            exact="true"
            className={({ isActive }) => (isActive ? 'navbar-link active' : 'navbar-link')}
            onClick={() => setMenuOpen(false)}
          >
            Health
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/category/sports"
            className={({ isActive }) => (isActive ? 'navbar-link active' : 'navbar-link')}
            onClick={() => setMenuOpen(false)}
          >
            Sports
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/category/technology"
            className={({ isActive }) => (isActive ? 'navbar-link active' : 'navbar-link')}
            onClick={() => setMenuOpen(false)}
          >
            Technology
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/category/business"
            className={({ isActive }) => (isActive ? 'navbar-link active' : 'navbar-link')}
            onClick={() => setMenuOpen(false)}
          >
            Business
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/category/entertainment"
            className={({ isActive }) => (isActive ? 'navbar-link active' : 'navbar-link')}
            onClick={() => setMenuOpen(false)}
          >
            Entertainment
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/category/science"
            className={({ isActive }) => (isActive ? 'navbar-link active' : 'navbar-link')}
            onClick={() => setMenuOpen(false)}
          >
            Science
          </NavLink>
        </li>
        
      </ul>
      <div className="navbar-actions">
        <form className="navbar-search" onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="Search hot topics or trends..."
            onChange={handleSearch}
            value={query}
          />
          <button type="submit"><Search size={20} /></button>
        </form>

        <div className="navbar-button">
          <DarkTheme />
        </div>
      </div>

      
    </nav>
  )
}

export default Navbar