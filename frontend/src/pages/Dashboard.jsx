import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';

const Dashboard = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();

    useEffect(() => {
        if (!userId) {
            navigate('/');
            return;
        }

        const fetchProjects = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/projects?userId=${userId}`);
                if (response.ok) {
                    const data = await response.json();
                    setProjects(data);
                }
            } catch (error) {
                console.error("Failed to fetch projects", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, [userId, navigate]);

    if (loading) return <div className="container" style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</div>;

    return (
        <div className="container animate-fade-in">
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h1>My Projects</h1>
                <button onClick={() => {
                    localStorage.clear();
                    navigate('/');
                }} className="btn btn-secondary">Logout</button>
            </header>

            {projects.length === 0 ? (
                <div className="card" style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                    <p>No active projects found.</p>
                    <p>Start a project via the Telegram Bot first.</p>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                    {projects.map((project) => {
                        const statusColors = {
                            'pending': 'var(--warning)',
                            'active': 'var(--success)',
                            'completed': 'var(--accent-color)',
                            'cancelled': 'var(--error)'
                        };
                        const statusColor = statusColors[project.status] || 'gray';

                        return (
                            <div
                                key={project.id}
                                className="card"
                                style={{ cursor: 'pointer' }}
                                onClick={() => navigate(`/project/${project.id}`)}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                    <span style={{
                                        backgroundColor: `rgba(0,0,0,0.3)`,
                                        color: statusColor,
                                        padding: '4px 8px',
                                        borderRadius: '8px',
                                        fontSize: '0.8rem',
                                        border: `1px solid ${statusColor}`
                                    }}>
                                        {project.status.toUpperCase()}
                                    </span>
                                    <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                        #{project.id.toString().slice(-4)}
                                    </span>
                                </div>
                                <h3 style={{ marginBottom: '10px', fontSize: '1.2rem' }}>
                                    {project.project.scope.substring(0, 50)}...
                                </h3>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                    <span>Budget: ₹{project.project.budget}</span>
                                    <span>{project.project.timeline_days} Days</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
