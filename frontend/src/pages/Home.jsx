import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../index.css';

const Home = () => {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
            <div className="aurora-bg">
                <div className="aurora-blob blob-1"></div>
                <div className="aurora-blob blob-2"></div>
                <div className="aurora-blob blob-3"></div>
            </div>

            <Navbar />

            {/* Hero Section */}
            <header className="fade-in-up" style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '6rem 2rem', // Increased top padding
                textAlign: 'center',
                zIndex: 2
            }}>
                <div style={{
                    marginBottom: '1rem',
                    padding: '8px 16px',
                    borderRadius: '99px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    fontSize: '0.85rem',
                    color: 'var(--text-secondary)',
                    fontWeight: 500
                }}>
                    ✨ Now live on Monad Testnet
                </div>

                <h1 style={{
                    fontSize: '4.5rem',
                    marginBottom: '1.5rem',
                    lineHeight: 1.1,
                    letterSpacing: '-0.02em',
                    fontWeight: 700
                }} className="hero-title text-gradient">

                    Escrow Reimagined.
                </h1>

                <p style={{
                    fontSize: '1.25rem',
                    color: 'var(--text-secondary)',
                    maxWidth: '550px',
                    marginBottom: '3rem',
                    lineHeight: 1.6
                }}>
                    The secure escrow layer for Telegram freelancers.
                    Manage projects, verify milestones, and get paid instantly with ZENT.
                </p>

                <div className="cta-buttons" style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <Link to="/login">
                        <button className="btn">
                            Start Escrow
                        </button>
                    </Link>
                    <a href="https://t.me/blanceronbot" target="_blank" rel="noopener noreferrer">
                        <button className="btn-secondary">
                            Open Telegram Bot
                        </button>
                    </a>
                </div>
            </header>

            {/* Features Section (Bento Grid) */}
            <section style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto', width: '100%', zIndex: 2 }}>
                <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2rem', fontWeight: 600 }}>Why ZENT?</h2>

                <div className="bento-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gridTemplateRows: 'repeat(2, minmax(200px, auto))',
                    gap: '24px'
                }}>
                    {/* Large Card */}
                    <div className="card" style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔒</div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Trustless Escrow</h3>
                        <p style={{ color: 'var(--text-secondary)' }}>
                            Funds are locked in a smart contract. Client deposits, you work.
                            Money is released only when milestones are met. No more chasing payments.
                        </p>
                    </div>

                    {/* Tall Card */}
                    <div className="card" style={{ gridRow: 'span 2', background: 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(109,40,217,0.1) 100%)' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚡</div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Instant Sync</h3>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                            Your chats, files, and project status sync instantly between this dashboard and the Telegram Bot.
                        </p>
                        {/* Mock UI Element */}
                        <div style={{
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: '12px',
                            padding: '16px',
                            fontSize: '0.8rem',
                            border: '1px solid rgba(255,255,255,0.1)'
                        }}>
                            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }}></div>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b' }}></div>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></div>
                            </div>
                            <div style={{ color: '#a0a0a0' }}>Syncing with Telegram...</div>
                            <div style={{ color: '#10b981', marginTop: '5px' }}>✓ Connected</div>
                        </div>
                    </div>

                    {/* Medium Card */}
                    <div className="card">
                        <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>💸</div>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Crypto Rails</h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                            Powered by Monad for sub-second finality and near-zero fees.
                        </p>
                    </div>

                    {/* Medium Card */}
                    <div className="card">
                        <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🤝</div>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Dispute Resolution</h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                            Fair arbitration process built-in if things go wrong.
                        </p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer style={{
                padding: '3rem 2rem',
                textAlign: 'center',
                borderTop: '1px solid rgba(255,255,255,0.05)',
                color: 'var(--text-secondary)',
                fontSize: '0.9rem',
                zIndex: 2,
                marginTop: 'auto'
            }}>
                <div style={{ marginBottom: '1rem', fontWeight: 600, fontSize: '1.1rem' }}>ZENT</div>
                &copy; {new Date().getFullYear()} Built for the Monad Hackathon.
            </footer>

            <style>{`
                @media (max-width: 768px) {
                    .hero-title { font-size: 3rem !important; }
                    .cta-buttons { flex-direction: column; width: 100%; }
                    .cta-buttons a, .cta-buttons button { width: 100%; }
                    .bento-grid {
                        grid-template-columns: 1fr !important;
                        grid-template-rows: auto !important;
                    }
                    .card { grid-column: span 1 !important; grid-row: span 1 !important; }
                }
            `}</style>
        </div>
    );
};

export default Home;
