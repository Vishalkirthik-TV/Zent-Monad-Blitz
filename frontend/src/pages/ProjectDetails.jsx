import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../index.css';

const ProjectDetails = () => {
    const { id } = useParams();
    const userId = localStorage.getItem('userId');
    const myUsername = localStorage.getItem('username');
    const navigate = useNavigate();

    const [project, setProject] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Poll for updates
    useEffect(() => {
        if (!userId) {
            navigate('/');
            return;
        }

        const fetchProject = async () => {
            try {
                // Add timestamp to prevent caching
                const response = await fetch(`http://localhost:3000/api/projects/${id}?t=${Date.now()}`, {
                    headers: { 'Cache-Control': 'no-cache' }
                });

                if (response.ok) {
                    const data = await response.json();
                    setProject(data);

                    // Update messages if conversation exists
                    if (data.project && data.project.conversation) {
                        setMessages(data.project.conversation);

                        // Auto-scroll if it's the first load or new message
                        // We can check if we are at bottom? For now, simple scroll
                        // logic is simplified to just check if length changed significantly
                        // or just let user scroll. 
                        // To fix stale closure 'prevLength', we can't reliably use it here 
                        // without refs. Let's just scroll if there are messages.

                        // Use a ref to track length if needed, but for now
                        // we rely on user manually scrolling or basic initial scroll.
                    }
                } else {
                    console.error("Project not found");
                }
            } catch (error) {
                console.error("Error fetching project", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
        const interval = setInterval(fetchProject, 3000); // Poll every 3s

        return () => clearInterval(interval);
    }, [id, userId, navigate]);

    // Initial scroll on load or when messages change
    useEffect(() => {
        if (!loading && messages.length > 0) {
            scrollToBottom();
        }
    }, [loading, messages.length]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        // Optimistic update
        const tempMsg = { role: 'user', text: newMessage, username: myUsername, timestamp: new Date().toISOString(), pending: true };
        setMessages([...messages, tempMsg]);
        setNewMessage("");
        scrollToBottom();

        try {
            const response = await fetch(`http://localhost:3000/api/chat/${id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, text: tempMsg.text })
            });

            if (!response.ok) {
                console.error("Failed to send message");
                // Remove optimistic message or show error... simpler to just let next poll fix it or retry
            }
        } catch (error) {
            console.error("Error sending message", error);
        }
    };

    if (loading) return <div className="container" style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</div>;
    if (!project) return <div className="container">Project not found.</div>;

    const isClient = parseInt(userId) === project.clientChatId || parseInt(userId) === project.clientId;
    const role = isClient ? 'Client' : 'Freelancer';

    return (
        <div className="container fade-in-up" style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '20px', minHeight: '80vh', marginTop: '20px' }}>

            {/* Sidebar: Project Info */}
            <div className="card" style={{ height: 'fit-content' }}>
                <button onClick={() => navigate('/dashboard')} className="btn btn-secondary" style={{ marginBottom: '20px', fontSize: '0.8rem' }}>← Back</button>

                <h2 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Project Details</h2>
                <div style={{ marginBottom: '20px' }}>
                    <span style={{
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '0.8rem'
                    }}>
                        {project.status.toUpperCase()}
                    </span>
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <h4 style={{ color: 'var(--text-secondary)', marginBottom: '5px' }}>Scope</h4>
                    <p style={{ fontSize: '0.9rem' }}>{project.project.scope}</p>
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <h4 style={{ color: 'var(--text-secondary)', marginBottom: '5px' }}>Budget</h4>
                    <p style={{ fontSize: '1.2rem', color: 'var(--success)' }}>₹{project.project.budget}</p>
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <h4 style={{ color: 'var(--text-secondary)', marginBottom: '5px' }}>Timeline</h4>
                    <p>{project.project.timeline_days} Days</p>
                </div>

                {project.project.milestones && project.project.milestones.length > 0 && (
                    <div>
                        <h4 style={{ color: 'var(--text-secondary)', marginBottom: '10px' }}>Milestones</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {project.project.milestones.map((m, idx) => (
                                <div key={idx} style={{
                                    padding: '8px',
                                    background: 'rgba(255,255,255,0.05)',
                                    borderRadius: '8px',
                                    borderLeft: m.status === 'paid' ? '3px solid var(--success)' : '3px solid var(--warning)'
                                }}>
                                    <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{m.description}</div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                        <span>₹{m.amount}</span>
                                        <span>{m.status}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Main: Chat Area */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '80vh', padding: '0', overflow: 'hidden' }}>
                <div style={{ padding: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)' }}>
                    <h3>Chat Room</h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        You are {role}. Talking to {isClient ? 'Freelancer' : 'Client'}.
                    </p>
                </div>

                <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {messages.length === 0 ? (
                        <div style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: '20px' }}>No messages yet. Say hi!</div>
                    ) : (
                        messages.map((msg, idx) => {
                            const isMe = msg.username === myUsername; // Simple check, might need robust ID check if usernames update
                            // Better check: use role if available? API returns role in msgObj
                            const isMyRole = (isClient && msg.role === 'client') || (!isClient && msg.role !== 'client');

                            // Align right if it's ME
                            return (
                                <div key={idx} style={{
                                    alignSelf: isMyRole ? 'flex-end' : 'flex-start',
                                    maxWidth: '70%',
                                }}>
                                    <div style={{
                                        fontSize: '0.75rem',
                                        marginBottom: '4px',
                                        textAlign: isMyRole ? 'right' : 'left',
                                        color: 'var(--text-secondary)'
                                    }}>
                                        {msg.username}
                                    </div>
                                    <div style={{
                                        background: isMyRole ? 'var(--accent-color)' : 'rgba(255,255,255,0.1)',
                                        color: 'white',
                                        padding: '12px 16px',
                                        borderRadius: '12px',
                                        borderBottomRightRadius: isMyRole ? '2px' : '12px',
                                        borderBottomLeftRadius: isMyRole ? '12px' : '2px',
                                        boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                                    }}>
                                        {msg.text}
                                    </div>
                                    <div style={{
                                        fontSize: '0.65rem',
                                        marginTop: '4px',
                                        textAlign: isMyRole ? 'right' : 'left',
                                        color: 'var(--text-secondary)',
                                        opacity: 0.7
                                    }}>
                                        {msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now'}
                                    </div>
                                </div>
                            );
                        })
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <div style={{ padding: '20px', borderTop: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)' }}>
                    <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '10px' }}>
                        <input
                            type="text"
                            placeholder="Type a message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            style={{ flex: 1 }}
                        />
                        <button type="submit" className="btn">Send</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetails;
