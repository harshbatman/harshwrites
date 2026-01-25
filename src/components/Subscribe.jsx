import React, { useState } from 'react';
import { Send, CheckCircle, Loader2 } from 'lucide-react';

const Subscribe = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) return;

        setStatus('loading');

        try {
            // Using FormSubmit.co to send email directly to the user
            const response = await fetch("https://formsubmit.co/ajax/kumarmahtoharsh7@gmail.com", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    _subject: "New Subscriber on Harsh Writes!",
                    message: `New subscription request from: ${email}`
                })
            });

            if (response.ok) {
                setStatus('success');
                setEmail('');
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error("Subscription error:", error);
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <section className="subscribe-section" style={{ padding: '5rem 2rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', animation: 'fadeIn 0.5s ease' }}>
                    <div style={{
                        width: '60px',
                        height: '60px',
                        background: '#dcfce7',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#16a34a',
                        marginBottom: '0.5rem'
                    }}>
                        <CheckCircle size={32} />
                    </div>
                    <h3 style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)', fontWeight: 700, margin: 0 }}>Thank you!</h3>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.2rem', textAlign: 'center', maxWidth: '500px' }}>
                        You will be updated with the next story directly in your inbox.
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section className="subscribe-section">
            <h3 style={{ fontSize: '2rem', marginBottom: '1rem', fontFamily: 'var(--font-serif)', fontWeight: 700 }}>Enjoyed reading?</h3>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2.5rem', fontSize: '1.1rem' }}>Subscribe to get my latest stories directly in your inbox.</p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '1rem', justifyContent: 'center', maxWidth: '450px', margin: '0 auto', position: 'relative' }}>
                <input
                    type="email"
                    placeholder="Enter your email address"
                    className="subscribe-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={status === 'loading'}
                />
                <button className="btn" type="submit" disabled={status === 'loading'} style={{ minWidth: '140px', justifyContent: 'center' }}>
                    {status === 'loading' ? (
                        <>Sending <Loader2 size={16} className="spin" /></>
                    ) : (
                        <>Subscribe <Send size={16} /></>
                    )}
                </button>
            </form>

            {status === 'error' && (
                <p style={{ color: '#ef4444', marginTop: '1rem', fontSize: '0.9rem' }}>
                    Something went wrong. Please try again later.
                </p>
            )}

            {/* Basic animation styles */}
            <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
        </section>
    );
};

export default Subscribe;
