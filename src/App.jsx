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
        <header className="site-header">
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link to="/" className="site-logo">harsh writes</Link>
          </div>
        </header>

        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/article/:id" element={<ArticleView />} />
          </Routes>

          {/* Subscribe Section */}
          <section className="subscribe-section">
            <h3 style={{ fontSize: '2rem', marginBottom: '1rem', fontFamily: 'var(--font-serif)', fontWeight: 700 }}>Enjoyed reading?</h3>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2.5rem', fontSize: '1.1rem' }}>Subscribe to get my latest stories directly in your inbox.</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', maxWidth: '450px', margin: '0 auto' }}>
              <input
                type="email"
                placeholder="Enter your email address"
                className="subscribe-input"
              />
              <button className="btn">
                Subscribe <Send size={16} />
              </button>
            </div>
          </section>
        </main>

        <footer>
          <p>&copy; 2023 harsh writes. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
