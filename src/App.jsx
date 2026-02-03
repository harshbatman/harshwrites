import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Send } from 'lucide-react';
import Home from './pages/Home';
import ArticleView from './pages/ArticleView';
import Subscribe from './components/Subscribe';
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
          <Subscribe />
        </main>

        <footer>
          <p>&copy; 2023 harsh writes. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
// deploy trigger
