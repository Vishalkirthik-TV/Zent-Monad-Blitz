import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import zentLogo from '../assets/zent_logo.png';
import '../index.css';

const Navbar = () => {
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username');
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        navigate('/login');
        setIsOpen(false);
    };

    return (
        <nav style={{
            padding: '1rem 2rem',
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            position: 'sticky',
            top: 0,
            zIndex: 1000
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                    <img src={zentLogo} alt="ZENT Logo" style={{ height: '40px', width: 'auto', filter: 'brightness(0) invert(1)', transform: 'scale(2.5)', transformOrigin: 'left center', marginLeft: '10px' }} />
                </Link>

                {/* Desktop Menu */}
                <div className="desktop-menu" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <Link to="/" className="nav-link" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '0.9rem' }}>Home</Link>
                    {userId && (
                        <Link to="/dashboard" className="nav-link" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '0.9rem' }}>Dashboard</Link>
                    )}

                    {userId ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>@{username}</span>
                            <button onClick={handleLogout} className="btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>Logout</button>
                        </div>
                    ) : (
                        <Link to="/login">
                            <button className="btn" style={{ padding: '8px 20px' }}>Login</button>
                        </Link>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="mobile-menu-btn"
                    onClick={() => setIsOpen(!isOpen)}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'white',
                        fontSize: '1.5rem',
                        cursor: 'pointer'
                    }}
                >
                    ☰
                </button>
            </div>

            {/* Mobile Dropdown */}
            {isOpen && (
                <div style={{
                    marginTop: '1rem',
                    padding: '1rem',
                    background: 'rgba(0,0,0,0.9)',
                    borderRadius: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem'
                }}>
                    <Link to="/" onClick={() => setIsOpen(false)} style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
                    {userId && <Link to="/dashboard" onClick={() => setIsOpen(false)} style={{ color: 'white', textDecoration: 'none' }}>Dashboard</Link>}
                    {userId ? (
                        <>
                            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>@{username}</div>
                            <button onClick={handleLogout} className="btn-secondary" style={{ width: '100%', textAlign: 'center' }}>Logout</button>
                        </>
                    ) : (
                        <Link to="/login" onClick={() => setIsOpen(false)}>
                            <button className="btn" style={{ width: '100%' }}>Login</button>
                        </Link>
                    )}
                </div>
            )}

            <style>{`
                @media (max-width: 768px) {
                    .desktop-menu { display: none !important; }
                    .mobile-menu-btn { display: block !important; }
                }
                @media (min-width: 769px) {
                    .mobile-menu-btn { display: none !important; }
                }
            `}</style>
        </nav>
    );
};

export default Navbar;
