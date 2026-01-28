import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Calendar, Share2 } from 'lucide-react';
import { articles } from '../data/articles';
import SupportSection from '../components/SupportSection';
import SupporterList from '../components/SupporterList';

function ArticleView() {
    const { id } = useParams();
    const article = articles.find(a => a.id === id);
    // ... (rest of logic)

    return (
        <article className="article-view">
            <div className="container">
                <div style={{ marginTop: '2rem' }}>
                    <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: '#6b7280', fontWeight: 500, fontSize: '0.9rem' }}>
                        <ArrowLeft size={16} /> Back to Stories
                    </Link>
                </div>

                <motion.header
                    className="story-header"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="story-meta">{article.category}</div>
                    <h1 className="story-title">{article.title}</h1>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', color: '#6b7280', fontSize: '0.95rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <img
                                src="/harsh-mahto.jpg"
                                alt={article.author}
                                style={{
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '50%',
                                    objectFit: 'cover',
                                    border: '1px solid #e5e7eb'
                                }}
                            />
                            <span>{article.author}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Calendar size={16} /> <span>{article.date}</span>
                        </div>
                    </div>
                </motion.header>

                <motion.div
                    className="story-image-container"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <img src={article.image} alt={article.title} style={{ width: '100%', display: 'block' }} />
                </motion.div>

                <motion.div
                    className="story-content"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    dangerouslySetInnerHTML={{ __html: article.content }}
                />

                <SupportSection />
                <SupporterList />

                <div style={{ padding: '3rem 0', marginTop: '3rem', borderTop: '1px solid #e5e7eb', display: 'flex', justifyContent: 'center' }}>
                    <button
                        onClick={handleShare}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: copied ? '#1a1a1a' : 'white', color: copied ? 'white' : '#374151', border: '1px solid #e5e7eb', padding: '0.75rem 1.5rem', borderRadius: '2rem', cursor: 'pointer', fontWeight: 500, transition: 'all 0.2s' }}
                    >
                        <Share2 size={18} /> {copied ? 'Link Copied!' : 'Share this story'}
                    </button>
                </div>
            </div>
        </article>
    );
}

export default ArticleView;
