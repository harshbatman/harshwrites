import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { articles } from '../data/articles';

function Home() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredArticles = articles.filter(article => {
        const searchLower = searchTerm.toLowerCase();
        return (
            article.title.toLowerCase().includes(searchLower) ||
            article.excerpt.toLowerCase().includes(searchLower) ||
            article.category.toLowerCase().includes(searchLower)
        );
    });

    return (
        <div className="home-container">
            <header className="story-header" style={{ paddingBottom: '1rem', maxWidth: '100%' }}>
                <h1 className="story-title" style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>The Journal</h1>
                <p className="story-meta">Thoughts, stories, and ideas.</p>

                <div className="search-wrapper" style={{ marginTop: '2rem', maxWidth: '500px' }}>
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                        <Search
                            size={20}
                            style={{
                                position: 'absolute',
                                left: '1rem',
                                color: 'var(--color-text-secondary)',
                                pointerEvents: 'none'
                            }}
                        />
                        <input
                            type="text"
                            placeholder="Search stories..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.875rem 1rem 0.875rem 3rem',
                                borderRadius: 'var(--radius-FULL)',
                                border: '1px solid var(--color-border)',
                                background: 'var(--color-surface)',
                                fontSize: '1rem',
                                color: 'var(--color-text-primary)',
                                outline: 'none',
                                transition: 'all 0.2s ease',
                                boxShadow: 'var(--shadow-sm)'
                            }}
                            className="search-input"
                        />
                    </div>
                </div>
            </header>

            <div className="articles-grid">
                {filteredArticles.map((article, index) => (
                    <motion.div
                        key={article.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className="article-card"
                    >
                        <div className="card-image">
                            <img
                                src={article.image}
                                alt={article.title}
                            />
                        </div>

                        <div className="card-content">
                            <div className="card-category">
                                {article.category}
                            </div>

                            <h2 className="card-title">
                                {article.title}
                            </h2>

                            <p className="card-excerpt">
                                {article.excerpt}
                            </p>

                            <Link to={`/article/${article.id}`} style={{ textDecoration: 'none', marginTop: 'auto' }}>
                                <button className="btn" style={{ padding: '0.6rem 1.2rem', fontSize: '0.85rem' }}>
                                    Read Story <ArrowRight size={14} />
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>

            {filteredArticles.length === 0 && (
                <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--color-text-secondary)' }}>
                    <p>No stories found matching "{searchTerm}"</p>
                </div>
            )}
        </div>
    );
}

export default Home;
