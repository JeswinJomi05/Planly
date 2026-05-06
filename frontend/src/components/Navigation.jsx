import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, StickyNote, Layers, Settings, Menu, X } from 'lucide-react';
import logo from '../assets/logo.png';
import './Navigation.css';

const Navigation = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = [
    { path: '/', name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/tasks', name: 'Tasks', icon: <CheckSquare size={20} /> },
    { path: '/notes', name: 'Notes', icon: <StickyNote size={20} /> },
    { path: '/cards', name: 'Flashcards', icon: <Layers size={20} /> },
  ];

  return (
    <>
      <div className="mobile-header glass">
        <div className="mobile-header-left">
          <div className="logo-glow" style={{ padding: '1px', borderRadius: '8px' }}>
            <img src={logo} alt="Planly Logo" className="logo" style={{ width: '35px', height: '35px', fontSize: '0.8rem', borderRadius: '6px' }} />
          </div>
          <h2>Planly</h2>
        </div>
        <button className="mobile-menu-btn" onClick={() => setIsMobileOpen(!isMobileOpen)}>
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMobileOpen && (
        <div className="mobile-overlay" onClick={() => setIsMobileOpen(false)}></div>
      )}

      <aside className={`sidebar glass ${isMobileOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
        <div className="logo-glow">
          <img src={logo} alt="Planly Logo" className="logo" ></img>
        </div>
        <h1>Planly</h1>
      </div>
      
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink 
            key={item.path} 
            to={item.path} 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setIsMobileOpen(false)}
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="nav-item user-profile">
          <div className="avatar">U</div>
          <span>User Account</span>
        </div>
      </div>
      </aside>
    </>
  );
};

export default Navigation;
