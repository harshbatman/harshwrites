import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Send } from 'lucide-react';
import Home from './pages/Home';
import ArticleView from './pages/ArticleView';
import './index.css';

function App() {
  return (
    <Router>
      <div className="app">
        <header>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link to="/" className="site-logo">harsh writes</Link>
          </div>
        </header>

        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/article/:id" element={<ArticleView />} />
          </Routes>

          {/* Subscribe Section (Visible on all pages, or could be moved to Home only if preferred) */}
          <section style={{ marginTop: '5rem', marginBottom: '5rem', padding: '3rem', backgroundColor: '#f9fafb', borderRadius: '1rem', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>Enjoyed reading?</h3>
            <p style={{ color: '#6b7280', marginBottom: '2rem' }}>Subscribe to get my latest stories directly in your inbox.</p>
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', maxWidth: '400px', margin: '0 auto' }}>
              <input
                type="email"
                placeholder="Enter your email"
                style={{ flex: 1, padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #d1d5db' }}
              />
              <button style={{ padding: '0.75rem 1.5rem', backgroundColor: '#1a1a1a', color: 'white', border: 'none', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                Subscribe <Send size={16} />
              </button>
            </div>
          </section>
        </main>

        <footer style={{ borderTop: '1px solid #e5e7eb', padding: '3rem 0', textAlign: 'center', color: '#6b7280' }}>
          <p>&copy; {new Date().getFullYear()} harsh writes. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
