import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Calendar, Share2, Eye, X } from 'lucide-react';
import { articles } from '../data/articles';
import SupportSection from '../components/SupportSection';
import SupporterList from '../components/SupporterList';

function ArticleView() {
    const { id } = useParams();
    const article = articles.find(a => a.id === id);
    const [copied, setCopied] = useState(false);
    const [zoomedImage, setZoomedImage] = useState(null);

    // Initial Scroll
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    // Handle Image Clicks for Lightbox
    useEffect(() => {
        // Wait for render
        const timer = setTimeout(() => {
            const contentDiv = document.querySelector('.story-content');
            if (!contentDiv) return;

            const handleImageClick = (e) => {
                // If clicked element is an image
                if (e.target.tagName === 'IMG') {
                    // Check if parent is NOT a link (to avoid hijacking linked images if any)
                    if (e.target.parentElement.tagName !== 'A') {
                        setZoomedImage(e.target.src);
                    }
                }
            };

            contentDiv.addEventListener('click', handleImageClick);

            // Cleanup
            return () => {
                contentDiv.removeEventListener('click', handleImageClick);
            };
        }, 500); // Small delay to ensure HTML is injected

        return () => clearTimeout(timer);
    }, [id, article]);

    // If article not found, show error
    if (!article) {
        return (
            <div className="container" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Article Not Found</h1>
                <p style={{ color: '#6b7280', marginBottom: '2rem' }}>The article you're looking for doesn't exist.</p>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <button className="btn">
                        <ArrowLeft size={16} /> Back to Home
                    </button>
                </Link>
            </div>
        );
    }

    // Format views count for display
    const formatViews = (views) => {
        if (views >= 1000) {
            return `${Math.floor(views / 1000)}K+`;
        }
        return `${views}+`;
    };

    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

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
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', color: '#6b7280', fontSize: '0.95rem', flexWrap: 'wrap' }}>
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
                            <Calendar size={16} /> <span>Published {article.date}</span>
                        </div>
                        {article.lastUpdated && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#059669' }}>
                                <Calendar size={16} /> <span>Updated {article.lastUpdated}</span>
                            </div>
                        )}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Eye size={16} /> <span>{formatViews(article.views)} reads</span>
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

                <div style={{ margin: '3rem 0', padding: '1.5rem', background: 'rgba(243, 244, 246, 0.5)', borderRadius: '12px', border: '1px solid #e5e7eb', textAlign: 'center' }}>
                    <p style={{ margin: 0, color: '#4b5563', fontSize: '1.05rem', lineHeight: '1.6' }}>
                        For any suggestions or feedback, feel free to connect at{' '}
                        <a href="mailto:harshwrites2023@gmail.com" style={{ color: '#111827', fontWeight: '600', textDecoration: 'none', borderBottom: '1px dotted #9ca3af', transition: 'all 0.2s' }}>
                            harshwrites2023@gmail.com
                        </a>
                    </p>
                </div>



                {/* Specific Appreciation Section for Transistors to AI */}
                {
                    article.id === 'transistors-to-ai' && (
                        <div style={{ marginTop: '2rem', marginBottom: '4rem', padding: '2rem', background: '#fafafa', borderRadius: '12px', border: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                            <h3 style={{ fontFamily: 'serif', fontSize: '1.25rem', fontWeight: 700, color: '#111827', marginBottom: '1.5rem' }}>From the Inbox</h3>

                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                                <img
                                    src="/aesha.jpg"
                                    alt="Feedback from Aesha Singh"
                                    title="Review from Aesha Singh"
                                    style={{ height: '180px', width: 'auto', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb', cursor: 'zoom-in', transition: 'transform 0.2s' }}
                                    onClick={() => setZoomedImage("/aesha.jpg")}
                                />
                                <img
                                    src="/vijay.jpg"
                                    alt="Feedback from Vijay Prasad"
                                    title="Review from Vijay Prasad"
                                    style={{ height: '180px', width: 'auto', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb', cursor: 'zoom-in', transition: 'transform 0.2s' }}
                                    onClick={() => setZoomedImage("/vijay.jpg")}
                                />
                            </div>

                        </div>
                    )
                }

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
            </div >

            {/* Lightbox for zooming images */}
            {
                zoomedImage && (
                    <div
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: 'rgba(0,0,0,0.95)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 9999,
                            cursor: 'zoom-out',
                            padding: '2rem'
                        }}
                        onClick={() => setZoomedImage(null)}
                    >
                        <button
                            onClick={() => setZoomedImage(null)}
                            style={{
                                position: 'absolute',
                                top: '20px',
                                right: '20px',
                                background: 'rgba(255, 255, 255, 0.2)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '50%',
                                width: '40px',
                                height: '40px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                backdropFilter: 'blur(4px)'
                            }}
                        >
                            <X size={24} />
                        </button>
                        <img
                            src={zoomedImage}
                            alt="Zoomed"
                            style={{
                                maxWidth: '100%',
                                maxHeight: '100%',
                                objectFit: 'contain',
                                borderRadius: '4px',
                                boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                                cursor: 'default'
                            }}
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                )
            }
        </article >
    );
}

export default ArticleView;
