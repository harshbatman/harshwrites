import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import { ArrowLeft, User, Calendar, Share2, Eye, X, Volume2, Square, Play, Pause, RotateCcw, Gauge } from 'lucide-react';
import { articles } from '../data/articles';
import SupportSection from '../components/SupportSection';
import SupporterList from '../components/SupporterList';

function ArticleView() {
    const { id } = useParams();
    const article = articles.find(a => a.id === id);
    const [copied, setCopied] = useState(false);
    const [zoomedImage, setZoomedImage] = useState(null);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [playbackRate, setPlaybackRate] = useState(1);
    const [currentChunkIndex, setCurrentChunkIndex] = useState(0);

    // Refs for real-time state access in callbacks and to prevent GC
    const isSpeakingRef = React.useRef(false);
    const isPausedRef = React.useRef(false);
    const playbackRateRef = React.useRef(1);
    const utteranceRef = React.useRef(null);

    // Sync refs with state
    useEffect(() => { isSpeakingRef.current = isSpeaking; }, [isSpeaking]);
    useEffect(() => { isPausedRef.current = isPaused; }, [isPaused]);
    useEffect(() => { playbackRateRef.current = playbackRate; }, [playbackRate]);

    // Initial Scroll
    useEffect(() => {
        window.scrollTo(0, 0);
        handleStopSpeech();
    }, [id]);

    // Handle Image Clicks for Lightbox
    useEffect(() => {
        const timer = setTimeout(() => {
            const contentDiv = document.querySelector('.story-content');
            if (!contentDiv) return;

            const handleImageClick = (e) => {
                if (e.target.tagName === 'IMG' && e.target.parentElement.tagName !== 'A') {
                    setZoomedImage(e.target.src);
                }
            };
            contentDiv.addEventListener('click', handleImageClick);
            return () => contentDiv.removeEventListener('click', handleImageClick);
        }, 500);
        return () => clearTimeout(timer);
    }, [id, article]);

    // Cleanup speech on unmount
    useEffect(() => {
        return () => {
            window.speechSynthesis.cancel();
        };
    }, []);

    const togglePlaybackRate = () => {
        const rates = [1, 1.25, 1.5, 2, 0.75];
        const nextRate = rates[(rates.indexOf(playbackRate) + 1) % rates.length];
        setPlaybackRate(nextRate);
        playbackRateRef.current = nextRate;

        if (isSpeakingRef.current && !isPausedRef.current) {
            window.speechSynthesis.cancel();
            speakFromIndex(currentChunkIndex, nextRate);
        }
    };

    const speakFromIndex = (index, rate = playbackRateRef.current) => {
        const synth = window.speechSynthesis;
        const contentDiv = document.querySelector('.story-content');
        if (!contentDiv) return;

        const text = `${article.title}. ${contentDiv.innerText}`;
        const chunks = text.match(/[^.!?]+[.!?]*/g) || [text];

        if (index >= chunks.length) {
            handleStopSpeech();
            return;
        }

        const utterance = new SpeechSynthesisUtterance(chunks[index].trim());
        utteranceRef.current = utterance; // Prevent GC

        const voices = synth.getVoices();
        const preferredMale =
            voices.find(v => v.name.includes('Google') && v.name.includes('Male') && v.lang.startsWith('en')) ||
            voices.find(v => v.name.includes('Male') && v.lang.startsWith('en')) ||
            voices.find(v => v.lang.startsWith('en'));

        if (preferredMale) utterance.voice = preferredMale;
        utterance.rate = rate;
        utterance.volume = 1;

        utterance.onend = () => {
            const nextIndex = index + 1;
            setCurrentChunkIndex(nextIndex);

            if (isSpeakingRef.current && !isPausedRef.current) {
                speakFromIndex(nextIndex, rate);
            }
        };

        utterance.onerror = (e) => {
            if (e.error === 'interrupted') return;
            console.error("Speech utterance error:", e);
            if (!isPausedRef.current) {
                setIsSpeaking(false);
                isSpeakingRef.current = false;
            }
        };

        synth.resume();
        synth.speak(utterance);
    };

    const handleToggleSpeech = () => {
        const synth = window.speechSynthesis;
        if (!synth) return;

        if (isSpeaking && !isPaused) {
            setIsPaused(true);
            isPausedRef.current = true;
            synth.cancel();
        } else if (isSpeaking && isPaused) {
            setIsPaused(false);
            isPausedRef.current = false;
            speakFromIndex(currentChunkIndex);
        } else {
            setIsSpeaking(true);
            isSpeakingRef.current = true;
            setIsPaused(false);
            isPausedRef.current = false;
            setCurrentChunkIndex(0);
            synth.cancel();

            // Audio unlock for mobile
            try { synth.speak(new SpeechSynthesisUtterance("")); } catch (e) { }

            setTimeout(() => {
                if (isSpeakingRef.current) {
                    speakFromIndex(0);
                }
            }, 100);
        }
    };

    const handleStopSpeech = () => {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        setIsPaused(false);
        setCurrentChunkIndex(0);
        isSpeakingRef.current = false;
        isPausedRef.current = false;
    };

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
            return `${Math.floor(views / 1000)} K + `;
        }
        return `${views} +`;
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

                <Motion.header
                    className="story-header"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="story-meta">{article.category}</div>
                    <h1 className="story-title">{article.title}</h1>
                    <div style={{
                        display: 'inline-flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '1.5rem',
                        background: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '16px',
                        padding: '1rem 2rem',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                        marginTop: '1.5rem',
                        maxWidth: '100%',
                        position: 'relative'
                    }}>
                        {/* Author */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <img
                                src="/harsh-mahto.jpg"
                                alt={article.author}
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    objectFit: 'cover',
                                    border: '2px solid #f3f4f6'
                                }}
                            />
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: '1.2' }}>
                                <span style={{ fontSize: '0.7rem', color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Author</span>
                                <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#111827' }}>{article.author}</span>
                            </div>
                        </div>

                        <div style={{ width: '1px', height: '24px', background: '#e5e7eb' }} className="hidden-mobile"></div>

                        {/* Publish Date */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: '1.2' }}>
                            <span style={{ fontSize: '0.7rem', color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Published</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#4b5563', fontSize: '0.9rem', fontWeight: 500 }}>
                                <Calendar size={14} /> <span>{article.date}</span>
                            </div>
                        </div>

                        {/* Last Updated */}
                        {article.lastUpdated && (
                            <>
                                <div style={{ width: '1px', height: '24px', background: '#e5e7eb' }} className="hidden-mobile"></div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: '1.2' }}>
                                    <span style={{ fontSize: '0.7rem', color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Updated</span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#059669', fontSize: '0.9rem', fontWeight: 600 }}>
                                        <Calendar size={14} /> <span>{article.lastUpdated}</span>
                                    </div>
                                </div>
                            </>
                        )}

                        <div style={{ width: '1px', height: '24px', background: '#e5e7eb' }} className="hidden-mobile"></div>

                        {/* Listen & Control Section */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: '1.2' }}>
                            <span style={{ fontSize: '0.7rem', color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Voice Agent</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.2rem' }}>
                                {/* Play / Pause */}
                                <button
                                    onClick={handleToggleSpeech}
                                    title={isSpeaking ? (isPaused ? 'Resume' : 'Pause') : 'Listen AI'}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.4rem',
                                        color: isSpeaking ? (isPaused ? '#6366f1' : '#f59e0b') : '#6366f1',
                                        fontSize: '0.9rem',
                                        fontWeight: 600,
                                        background: 'none',
                                        border: 'none',
                                        padding: 0,
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                    }}
                                >
                                    {isSpeaking ? (isPaused ? <Play size={16} fill="currentColor" /> : <Pause size={16} fill="currentColor" />) : <Volume2 size={16} />}
                                    <span>{isSpeaking ? (isPaused ? 'Resume' : 'Pause') : 'Listen'}</span>
                                </button>

                                {/* Stop / Reset */}
                                {isSpeaking && (
                                    <button
                                        onClick={handleStopSpeech}
                                        title="Stop & Reset"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            color: '#ef4444',
                                            background: 'none',
                                            border: 'none',
                                            padding: 0,
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <RotateCcw size={14} />
                                    </button>
                                )}

                                {/* Speed Control */}
                                <button
                                    onClick={togglePlaybackRate}
                                    title="Playback Speed"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.25rem',
                                        color: '#6b7280',
                                        fontSize: '0.8rem',
                                        fontWeight: 700,
                                        background: '#f3f4f6',
                                        border: '1px solid #e5e7eb',
                                        padding: '0.1rem 0.5rem',
                                        borderRadius: '4px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <Gauge size={12} />
                                    <span>{playbackRate}x</span>
                                </button>

                                {/* Animation */}
                                {isSpeaking && !isPaused && (
                                    <span style={{ display: 'flex', gap: '2px', marginLeft: '4px' }}>
                                        {[1, 2, 3].map(i => (
                                            <Motion.span
                                                key={i}
                                                animate={{ height: [4, 10, 4] }}
                                                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
                                                style={{ width: '2px', background: '#6366f1', borderRadius: '1px' }}
                                            />
                                        ))}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div style={{ width: '1px', height: '24px', background: '#e5e7eb' }} className="hidden-mobile"></div>

                        {/* Reads */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: '1.2' }}>
                            <span style={{ fontSize: '0.7rem', color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Reads</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#4b5563', fontSize: '0.9rem', fontWeight: 500 }}>
                                <Eye size={14} /> <span>{formatViews(article.views)}</span>
                            </div>
                        </div>
                    </div>
                </Motion.header>

                <Motion.div
                    className="story-image-container"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <img src={article.image} alt={article.title} style={{ width: '100%', display: 'block' }} />
                </Motion.div>

                <Motion.div
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
                                <img
                                    src="/kusum.jpg"
                                    alt="Feedback from Kusum Singh"
                                    title="Review from Kusum Singh"
                                    style={{ height: '180px', width: 'auto', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb', cursor: 'zoom-in', transition: 'transform 0.2s' }}
                                    onClick={() => setZoomedImage("/kusum.jpg")}
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
