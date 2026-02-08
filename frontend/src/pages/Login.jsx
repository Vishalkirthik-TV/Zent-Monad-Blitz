import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import zentLogo from '../assets/zent_logo.png';
import '../index.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username })
            });

            const data = await response.json();

            if (response.ok) {
                // Store session
                localStorage.setItem('userId', data.userId);
                localStorage.setItem('username', data.username);
                navigate('/dashboard');
            } else {
                setError(data.error || 'Login failed');
            }
        } catch (err) {
            setError('Failed to connect to server');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            textAlign: 'center'
        }}>
            <div className="card animate-fade-in" style={{ width: '400px', maxWidth: '90%' }}>
                <img src={zentLogo} alt="ZENT" style={{ width: '80px', marginBottom: '1rem', dropShadow: '0 0 10px rgba(168, 85, 247, 0.5)' }} />
                <h1 style={{ marginBottom: '1rem', background: 'linear-gradient(to right, #fff, #a0a0a0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '2.5rem' }}>
                    ZENT
                </h1>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                    Secure Escrow for Telegram
                </p>

                {error && (
                    <div style={{
                        background: 'rgba(239, 68, 68, 0.2)',
                        color: '#fca5a5',
                        padding: '10px',
                        borderRadius: '8px',
                        marginBottom: '1rem',
                        fontSize: '0.9rem'
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Enter Telegram Username (@user)"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    {/* Fake Password field for "replication" though not checked */}
                    <div className="input-group">
                        <input
                            type="password"
                            placeholder="Password (Any)"
                            disabled={isLoading}
                        />
                    </div>

                    <button type="submit" className="btn" style={{ width: '100%' }} disabled={isLoading}>
                        {isLoading ? 'Connecting...' : 'Login'}
                    </button>

                    <p style={{ marginTop: '1.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        Ensure you have started the bot on Telegram first.
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
