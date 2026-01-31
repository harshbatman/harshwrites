import React, { useState, useEffect } from 'react';
import { motion as Motion } from 'framer-motion';
import { ArrowRight, Search, Calendar, TrendingUp, Clock, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { articles } from '../data/articles';

function Home() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('latest');

    // Scroll to top when home page loads
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Format views count for display
    const formatViews = (views) => {
        if (views >= 1000) {
            return `${Math.floor(views / 1000)}K+`;
        }
        return `${views}+`;
    };

    // Filter articles based on search term
    const filteredArticles = articles
        .filter(article =>
            article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
            article.category.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            if (filter === 'latest') {
                return new Date(b.publishDate) - new Date(a.publishDate);
            } else if (filter === 'most-read') {
                // Always put "From Transistors to AI" first
                if (a.id === 'transistors-to-ai') return -1;
                if (b.id === 'transistors-to-ai') return 1;
                // Then sort the rest by views
                return b.views - a.views;
            } else if (filter === 'oldest') {
                return new Date(a.publishDate) - new Date(b.publishDate);
            }
            return 0;
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

            <div className="filter-tabs" style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                <button
                    onClick={() => setFilter('latest')}
                    style={{
                        padding: '0.5rem 1rem',
                        borderRadius: 'var(--radius-FULL)',
                        border: filter === 'latest' ? '1px solid var(--color-text-primary)' : '1px solid var(--color-border)',
                        background: filter === 'latest' ? 'var(--color-text-primary)' : 'transparent',
                        color: filter === 'latest' ? 'var(--color-bg)' : 'var(--color-text-secondary)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        fontSize: '0.9rem',
                        transition: 'all 0.2s ease',
                        fontWeight: filter === 'latest' ? 600 : 400
                    }}
                >
                    <Calendar size={14} /> Latest
                </button>
                <button
                    onClick={() => setFilter('most-read')}
                    style={{
                        padding: '0.5rem 1rem',
                        borderRadius: 'var(--radius-FULL)',
                        border: filter === 'most-read' ? '1px solid var(--color-text-primary)' : '1px solid var(--color-border)',
                        background: filter === 'most-read' ? 'var(--color-text-primary)' : 'transparent',
                        color: filter === 'most-read' ? 'var(--color-bg)' : 'var(--color-text-secondary)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        fontSize: '0.9rem',
                        transition: 'all 0.2s ease',
                        fontWeight: filter === 'most-read' ? 600 : 400
                    }}
                >
                    <TrendingUp size={14} /> Most Read
                </button>
                <button
                    onClick={() => setFilter('oldest')}
                    style={{
                        padding: '0.5rem 1rem',
                        borderRadius: 'var(--radius-FULL)',
                        border: filter === 'oldest' ? '1px solid var(--color-text-primary)' : '1px solid var(--color-border)',
                        background: filter === 'oldest' ? 'var(--color-text-primary)' : 'transparent',
                        color: filter === 'oldest' ? 'var(--color-bg)' : 'var(--color-text-secondary)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        fontSize: '0.9rem',
                        transition: 'all 0.2s ease',
                        fontWeight: filter === 'oldest' ? 600 : 400
                    }}
                >
                    <Clock size={14} /> Oldest
                </button>
            </div>

            <div className="articles-grid">
                {filteredArticles.map((article, index) => (
                    <Motion.div
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
                                {article.content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 150) + (article.content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().length > 150 ? '...' : '')}
                            </p>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-text-secondary)', fontSize: '0.85rem', marginTop: '0.75rem' }}>
                                <Eye size={16} />
                                <span>{formatViews(article.views)} reads</span>
                            </div>

                            <Link to={`/article/${article.id}`} style={{ textDecoration: 'none', marginTop: 'auto' }}>
                                <button className="btn" style={{ padding: '0.6rem 1.2rem', fontSize: '0.85rem' }}>
                                    Read Story <ArrowRight size={14} />
                                </button>
                            </Link>
                        </div>
                    </Motion.div>
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
