import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { articles } from '../data/articles';

function Home() {
    return (
        <div className="home-container">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="hero"
                style={{ padding: '4rem 0', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}
            >
                <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '3.5rem', marginBottom: '1rem' }}>HarshWrites</h1>
                <p style={{ fontSize: '1.2rem', color: '#666' }}>Navigating the intersection of technology, geopolitics, and human stories.</p>
            </motion.div>

            <div className="articles-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                gap: '2.5rem',
                padding: '2rem 0'
            }}>
                {articles.map((article, index) => (
                    <motion.div
                        key={article.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="article-card"
                        style={{
                            background: 'white',
                            borderRadius: '16px',
                            overflow: 'hidden',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                            border: '1px solid #f3f4f6',
                            display: 'flex',
                            flexDirection: 'column',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                        }}
                        whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                    >
                        <div className="card-image" style={{ height: '240px', overflow: 'hidden' }}>
                            <img
                                src={article.image}
                                alt={article.title}
                                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                            />
                        </div>

                        <div className="card-content" style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <div style={{
                                fontSize: '0.75rem',
                                textTransform: 'uppercase',
                                color: '#2563eb',
                                fontWeight: 600,
                                letterSpacing: '0.05em',
                                marginBottom: '0.75rem'
                            }}>
                                {article.category}
                            </div>

                            <h2 style={{
                                fontFamily: 'var(--font-serif)',
                                fontSize: '1.5rem',
                                margin: '0 0 1rem 0',
                                lineHeight: 1.3
                            }}>
                                {article.title}
                            </h2>

                            <p style={{
                                color: '#6b7280',
                                marginBottom: '1.5rem',
                                fontSize: '1rem',
                                lineHeight: 1.6,
                                flex: 1
                            }}>
                                {article.excerpt}
                            </p>

                            <Link to={`/article/${article.id}`} style={{ textDecoration: 'none' }}>
                                <button style={{
                                    background: '#1a1a1a',
                                    color: 'white',
                                    padding: '0.8rem 1.5rem',
                                    borderRadius: '100px',
                                    border: 'none',
                                    fontSize: '0.9rem',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    width: 'fit-content'
                                }}>
                                    Read Story <ArrowRight size={16} />
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

export default Home;
