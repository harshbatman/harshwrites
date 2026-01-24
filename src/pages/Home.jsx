import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { articles } from '../data/articles';

function Home() {
    return (
        <div className="home-container">


            <div className="articles-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '2rem',
                padding: '2rem 0'
            }}>
                {articles.map((article, index) => (
                    <motion.div
                        key={article.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="article-card"
                        style={{
                            background: 'white',
                            borderRadius: '28px', // More "square round"
                            overflow: 'hidden',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                            border: '1px solid #f3f4f6',
                            display: 'flex',
                            flexDirection: 'column',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                        }}
                        whileHover={{ y: -5, boxShadow: '0 12px 30px rgba(0,0,0,0.1)' }}
                    >
                        <div className="card-image" style={{ width: '100%', aspectRatio: '16/9', overflow: 'hidden', background: '#f0f0f0' }}>
                            <img
                                src={article.image}
                                alt={article.title}
                                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                            />
                        </div>

                        <div className="card-content" style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <div style={{
                                fontSize: '0.7rem',
                                textTransform: 'uppercase',
                                color: '#2563eb',
                                fontWeight: 700,
                                letterSpacing: '0.05em',
                                marginBottom: '0.5rem'
                            }}>
                                {article.category}
                            </div>

                            <h2 style={{
                                fontFamily: 'var(--font-serif)',
                                fontSize: '1.4rem',
                                margin: '0 0 0.75rem 0',
                                lineHeight: 1.25,
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden'
                            }}>
                                {article.title}
                            </h2>

                            <p style={{
                                color: '#6b7280',
                                marginBottom: '1.25rem',
                                fontSize: '0.95rem',
                                lineHeight: 1.5,
                                flex: 1,
                                display: '-webkit-box',
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden'
                            }}>
                                {article.excerpt}
                            </p>

                            <Link to={`/article/${article.id}`} style={{ textDecoration: 'none' }}>
                                <button style={{
                                    background: '#1a1a1a',
                                    color: 'white',
                                    padding: '0.7rem 1.4rem',
                                    borderRadius: '100px',
                                    border: 'none',
                                    fontSize: '0.85rem',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.4rem',
                                    width: 'fit-content'
                                }}>
                                    Read Story <ArrowRight size={15} />
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
