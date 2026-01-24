import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { articles } from '../data/articles';

function Home() {
    return (
        <div className="home-container">
            <header className="story-header" style={{ paddingBottom: '1rem', maxWidth: '100%' }}>
                <h1 className="story-title" style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>The Journal</h1>
                <p className="story-meta">Thoughts, stories, and ideas.</p>
            </header>

            <div className="articles-grid">
                {articles.map((article, index) => (
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
        </div>
    );
}

export default Home;
