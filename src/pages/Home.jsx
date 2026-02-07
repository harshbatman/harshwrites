import React, { useState, useEffect } from 'react';
import { motion as Motion } from 'framer-motion';
import { ArrowRight, Search, Calendar, TrendingUp, Clock, Eye, LayoutGrid, List } from 'lucide-react';
import { Link } from 'react-router-dom';
import { articles } from '../data/articles';

function Home() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('latest');
    const [viewType, setViewType] = useState('grid');

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

    // Filter articles based on search term (searching title, excerpt, category, and full content)
    const filteredArticles = articles
        .filter(article => {
            if (!searchTerm) return true;
            const searchLower = searchTerm.toLowerCase();
            return (
                article.title.toLowerCase().includes(searchLower) ||
                article.excerpt.toLowerCase().includes(searchLower) ||
                article.category.toLowerCase().includes(searchLower) ||
                article.content.toLowerCase().includes(searchLower)
            );
        })
        .sort((a, b) => {
            // If there's a search term, prioritize title matches first
            if (searchTerm) {
                const searchLower = searchTerm.toLowerCase();
                const aTitleMatch = a.title.toLowerCase().includes(searchLower);
                const bTitleMatch = b.title.toLowerCase().includes(searchLower);
                if (aTitleMatch && !bTitleMatch) return -1;
                if (!aTitleMatch && bTitleMatch) return 1;
            }

            // Then apply the selected filter
            if (filter === 'latest') {
                return new Date(b.publishDate) - new Date(a.publishDate);
            } else if (filter === 'most-read') {
                if (a.id === 'transistors-to-ai') return -1;
                if (b.id === 'transistors-to-ai') return 1;
                return b.views - a.views;
            } else if (filter === 'oldest') {
                return new Date(a.publishDate) - new Date(b.publishDate);
            }
            return 0;
        });

    return (
        <div className="home-container">
            <header className="story-header" style={{ maxWidth: '100%' }}>
                <h1 className="story-title">The Journal</h1>
                <p className="story-meta">Thoughts, stories, and ideas.</p>

                <div className="search-wrapper" style={{ marginTop: '3rem', maxWidth: '600px', margin: '3rem auto 0' }}>
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                        <Search
                            size={18}
                            style={{
                                position: 'absolute',
                                left: '1.25rem',
                                color: 'var(--color-text-tertiary)',
                                pointerEvents: 'none'
                            }}
                        />
                        <input
                            type="text"
                            placeholder="Search stories, ideas, or topics..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '1rem 1.25rem 1rem 3.5rem',
                                borderRadius: 'var(--radius-FULL)',
                                border: '1px solid var(--color-border)',
                                background: 'white',
                                fontSize: '1rem',
                                color: 'var(--color-text-primary)',
                                outline: 'none',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 10px 30px -10px rgba(0,0,0,0.05)'
                            }}
                            className="search-input"
                        />
                    </div>
                </div>
            </header>

            <div className="container stack-mobile" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
                <div className="filter-tabs" style={{ display: 'flex', gap: '0.5rem' }}>
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

                <div style={{ display: 'flex', background: 'transparent', gap: '0.5rem' }}>
                    <button
                        onClick={() => setViewType('grid')}
                        style={{
                            padding: '0.5rem 1rem',
                            borderRadius: 'var(--radius-FULL)',
                            border: viewType === 'grid' ? '1px solid var(--color-text-primary)' : '1px solid var(--color-border)',
                            background: viewType === 'grid' ? 'var(--color-text-primary)' : 'transparent',
                            color: viewType === 'grid' ? 'var(--color-bg)' : 'var(--color-text-secondary)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            fontSize: '0.9rem',
                            transition: 'all 0.2s ease',
                            fontWeight: viewType === 'grid' ? 600 : 400
                        }}
                    >
                        <LayoutGrid size={16} /> Grid
                    </button>
                    <button
                        onClick={() => setViewType('list')}
                        style={{
                            padding: '0.5rem 1rem',
                            borderRadius: 'var(--radius-FULL)',
                            border: viewType === 'list' ? '1px solid var(--color-text-primary)' : '1px solid var(--color-border)',
                            background: viewType === 'list' ? 'var(--color-text-primary)' : 'transparent',
                            color: viewType === 'list' ? 'var(--color-bg)' : 'var(--color-text-secondary)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            fontSize: '0.9rem',
                            transition: 'all 0.2s ease',
                            fontWeight: viewType === 'list' ? 600 : 400
                        }}
                    >
                        <List size={16} /> List
                    </button>
                </div>
            </div>

            {viewType === 'grid' ? (
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
                                    style={{
                                        objectPosition: article.objectPosition || 'center'
                                    }}
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

                                <div className="card-footer">
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--color-text-tertiary)', fontSize: '0.75rem', whiteSpace: 'nowrap' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                            <Eye size={12} />
                                            <span>{formatViews(article.views)}</span>
                                        </div>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.3rem' }}>
                                            <Calendar size={12} />
                                            <span>{article.date}</span>
                                            {article.lastUpdated && (
                                                <>
                                                    <span style={{ opacity: 0.5, margin: '0 0.2rem' }}>|</span>
                                                    <span style={{ color: 'var(--color-text-secondary)', fontWeight: 600 }}>Upd: {article.lastUpdated}</span>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    <Link to={`/article/${article.id}`} style={{ textDecoration: 'none', flexShrink: 0 }}>
                                        <button className="btn" style={{ padding: '0.5rem 1rem', fontSize: '0.75rem', whiteSpace: 'nowrap', minWidth: 'max-content' }}>
                                            Read Story <ArrowRight size={12} />
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </Motion.div>
                    ))}
                </div>
            ) : (
                <div className="articles-list" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1rem' }}>
                    {filteredArticles.map((article, index) => (
                        <Motion.div
                            key={article.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05, duration: 0.4 }}
                            style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '1.5rem',
                                padding: '1.5rem 0',
                                borderBottom: '1px solid var(--color-border)',
                                position: 'relative'
                            }}
                        >
                            <span style={{
                                fontSize: '2.5rem',
                                fontWeight: 900,
                                color: '#64748b',
                                fontFamily: 'var(--font-serif)',
                                minWidth: '4.5rem',
                                paddingTop: '0.2rem'
                            }}>
                                {(index + 1).toString().padStart(2, '0')}
                            </span>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                    <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--color-text-primary)', fontWeight: 700, letterSpacing: '0.05em' }}>
                                        {article.category}
                                    </span>
                                    <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--color-text-tertiary)' }}></span>
                                    <span style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)', fontWeight: 500 }}>{article.date}</span>
                                </div>
                                <Link to={`/article/${article.id}`} style={{ textDecoration: 'none' }}>
                                    <h2 className="list-title" style={{
                                        fontSize: '1.35rem',
                                        fontFamily: 'var(--font-serif)',
                                        fontWeight: 700,
                                        color: 'var(--color-text-primary)',
                                        marginBottom: '0.5rem',
                                        transition: 'color 0.2s ease',
                                        lineHeight: 1.3
                                    }}>
                                        {article.title}
                                    </h2>
                                </Link>
                                <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', marginBottom: '1rem', lineHeight: 1.5 }}>
                                    {article.excerpt}
                                </p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--color-text-secondary)', fontSize: '0.85rem', fontWeight: 500 }}>
                                        <Eye size={14} />
                                        <span>{formatViews(article.views)} reads</span>
                                    </div>
                                    <Link to={`/article/${article.id}`} style={{
                                        fontSize: '0.85rem',
                                        fontWeight: 600,
                                        color: 'var(--color-text-primary)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.3rem'
                                    }}>
                                        Start Reading <ArrowRight size={14} />
                                    </Link>
                                </div>
                            </div>
                        </Motion.div>
                    ))}
                </div>
            )}

            {filteredArticles.length === 0 && (
                <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--color-text-secondary)' }}>
                    <p>No stories found matching "{searchTerm}"</p>
                </div>
            )}
        </div>
    );
}

export default Home;
