import { NavLink } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, StickyNote, Layers, Settings } from 'lucide-react';
import './Navigation.css';

const Navigation = () => {
  const navItems = [
    { path: '/', name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/tasks', name: 'Tasks', icon: <CheckSquare size={20} /> },
    { path: '/notes', name: 'Notes', icon: <StickyNote size={20} /> },
    { path: '/cards', name: 'Flashcards', icon: <Layers size={20} /> },
  ];

  return (
    <aside className="sidebar glass">
      <div className="sidebar-header">
        <div className="logo-glow">
          <div className="logo-icon">P</div>
        </div>
        <h2>Planly</h2>
      </div>
      
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink 
            key={item.path} 
            to={item.path} 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
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
  );
};

export default Navigation;
