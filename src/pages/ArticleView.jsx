import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import { ArrowLeft, User, Calendar, Share2, Eye, X, Volume2, Square, Play, Pause, RotateCw, RotateCcw, Gauge, Clock } from 'lucide-react';
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
    const [currentWordInfo, setCurrentWordInfo] = useState({ offset: 0, length: 0 });
    const [allChunks, setAllChunks] = useState([]);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);

    // Refs for real-time state access, to prevent GC, and for fallback timers
    const isSpeakingRef = React.useRef(false);
    const isPausedRef = React.useRef(false);
    const playbackRateRef = React.useRef(1);
    const utteranceRef = React.useRef(null);
    const fallbackTimerRef = React.useRef(null);
    const lastBoundaryTimeRef = React.useRef(0);

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // Sync refs with state
    useEffect(() => { isSpeakingRef.current = isSpeaking; }, [isSpeaking]);
    useEffect(() => { isPausedRef.current = isPaused; }, [isPaused]);
    useEffect(() => { playbackRateRef.current = playbackRate; }, [playbackRate]);

    // Handle window resize for mobile responsiveness
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Initial Scroll
    useEffect(() => {
        window.scrollTo(0, 0);
        handleStopSpeech();
    }, [id]);

    // Handle Image Clicks for Lightbox
    useEffect(() => {
        const contentDiv = document.querySelector('.story-content');
        if (!contentDiv) return;

        const handleImageClick = (e) => {
            if (e.target.tagName === 'IMG' && e.target.parentElement.tagName !== 'A') {
                setZoomedImage(e.target.src);
            }
        };
        contentDiv.addEventListener('click', handleImageClick);
        return () => contentDiv.removeEventListener('click', handleImageClick);
    }, [id, article, allChunks]); // Re-attach when content might have changed

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

    // Prepare chunks once when article or content changes
    useEffect(() => {
        const contentDiv = document.querySelector('.story-content');
        if (article && contentDiv) {
            const text = `${article.title}. ${contentDiv.innerText}`;
            const chunks = text.split(/(?<=[.!?])\s+/).filter(s => s.length > 0);
            setAllChunks(chunks);
        }
    }, [article, id]);

    const speakFromIndex = (index, rate = playbackRateRef.current) => {
        const synth = window.speechSynthesis;
        const contentDiv = document.querySelector('.story-content');

        let chunks = allChunks;
        if (chunks.length === 0 && article && contentDiv) {
            const text = `${article.title}. ${contentDiv.innerText}`;
            chunks = text.split(/(?<=[.!?])\s+/).filter(s => s.length > 0);
            setAllChunks(chunks);
        }

        if (index >= chunks.length) {
            handleStopSpeech();
            return;
        }

        const currentText = chunks[index];
        const utterance = new SpeechSynthesisUtterance(currentText);
        utteranceRef.current = utterance;

        // Reset tracking
        setCurrentWordInfo({ offset: 0, length: 0 });
        lastBoundaryTimeRef.current = 0;
        if (fallbackTimerRef.current) clearInterval(fallbackTimerRef.current);

        // Word Tracking
        utterance.onboundary = (event) => {
            if (event.name === 'word') {
                lastBoundaryTimeRef.current = Date.now();
                let length = event.charLength;
                if (!length || length === 0) {
                    const remaining = currentText.substring(event.charIndex);
                    const wordMatch = remaining.match(/^\s*([^\s.!?]+)/);
                    length = wordMatch ? wordMatch[1].length : 1;
                    const spaceMatch = remaining.match(/^(\s+)/);
                    const leadingSpaces = spaceMatch ? spaceMatch[1].length : 0;
                    setCurrentWordInfo({
                        offset: event.charIndex + leadingSpaces,
                        length: length
                    });
                } else {
                    setCurrentWordInfo({ offset: event.charIndex, length: length });
                }
            }
        };

        const voices = synth.getVoices();
        let preferredVoice =
            voices.find(v => v.name.includes('Samantha')) ||
            voices.find(v => v.name.includes('Siri')) ||
            voices.find(v => v.name.includes('Google US English')) ||
            voices.find(v => v.name.includes('Apple') && v.lang.startsWith('en')) ||
            voices.find(v => v.name.includes('Premium') && v.lang.startsWith('en')) ||
            voices.find(v => v.name.includes('Enhanced') && v.lang.startsWith('en')) ||
            voices.find(v => v.lang === 'en-US') ||
            voices.find(v => v.lang.startsWith('en'));

        if (preferredVoice) utterance.voice = preferredVoice;
        utterance.rate = rate;
        utterance.pitch = 1.0;
        utterance.volume = 1;

        utterance.onstart = () => {
            const paragraphs = contentDiv.querySelectorAll('p, h2, h3, li');
            const targetText = currentText.trim().substring(0, 40);
            for (let p of paragraphs) {
                if (p.innerText.includes(targetText)) {
                    p.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    p.style.transition = 'all 0.5s';
                    p.style.background = 'rgba(99, 102, 241, 0.08)';
                    p.style.borderLeft = '4px solid #6366f1';
                    setTimeout(() => {
                        p.style.background = '';
                        p.style.borderLeft = '';
                    }, 5000);
                    break;
                }
            }

            const words = currentText.split(/(\s+)/);
            let charOffset = 0;
            const wordPositions = words.map(w => {
                const pos = { text: w, offset: charOffset, length: w.length };
                charOffset += w.length;
                return pos;
            }).filter(w => w.text.trim().length > 0);

            fallbackTimerRef.current = setInterval(() => {
                if (isPausedRef.current) return;
                if (Date.now() - lastBoundaryTimeRef.current < 2000 && lastBoundaryTimeRef.current !== 0) return;

                const msPerWord = (60000 / (170 * playbackRateRef.current));
                const elapsedSinceStart = Date.now() - (utterance.startTime || Date.now());
                const estimatedWordIndex = Math.floor(elapsedSinceStart / msPerWord);

                if (wordPositions[estimatedWordIndex]) {
                    setCurrentWordInfo({
                        offset: wordPositions[estimatedWordIndex].offset,
                        length: wordPositions[estimatedWordIndex].length
                    });
                }
            }, 100);
            utterance.startTime = Date.now();
        };

        utterance.onend = () => {
            if (fallbackTimerRef.current) clearInterval(fallbackTimerRef.current);
            const nextIndex = index + 1;
            if (isSpeakingRef.current && !isPausedRef.current) {
                setCurrentChunkIndex(nextIndex);
                setCurrentWordInfo({ offset: 0, length: 0 });
                speakFromIndex(nextIndex, rate);
            }
        };

        utterance.onerror = (e) => {
            if (fallbackTimerRef.current) clearInterval(fallbackTimerRef.current);
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
                if (isSpeakingRef.current && !isPausedRef.current) {
                    speakFromIndex(0);
                }
            }, 50);
        }
    };

    const handleStopSpeech = () => {
        if (fallbackTimerRef.current) clearInterval(fallbackTimerRef.current);
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        setIsPaused(false);
        setIsVideoPlaying(false);
        setCurrentChunkIndex(0);
        setCurrentWordInfo({ offset: 0, length: 0 });
        isSpeakingRef.current = false;
        isPausedRef.current = false;
    };

    // Video Sync Logic
    const handlePlayVideo = () => {
        setIsVideoPlaying(true);
        if (!isSpeakingRef.current) {
            handleToggleSpeech();
        }
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

    // Calculate dynamic reading time (avg 200 words per minute)
    const calculateReadTime = (content) => {
        if (!content) return "1 min read";
        const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
        const minutes = Math.max(1, Math.ceil(words / 200));
        return `${minutes} min read`;
    };

    const readTime = article.readTime || calculateReadTime(article.content);

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
                <div style={{ marginTop: '3rem', marginBottom: '1.5rem' }}>
                    <Link to="/" style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        textDecoration: 'none',
                        color: 'var(--color-text-tertiary)',
                        fontWeight: 600,
                        fontSize: '0.95rem',
                        transition: 'color 0.2s ease'
                    }}
                        onMouseEnter={(e) => e.target.style.color = 'var(--color-text-primary)'}
                        onMouseLeave={(e) => e.target.style.color = 'var(--color-text-tertiary)'}
                    >
                        <ArrowLeft size={18} /> Back to stories
                    </Link>
                </div>

                <Motion.header
                    className="story-header"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ textAlign: 'left', maxWidth: '100%', padding: windowWidth < 768 ? '2rem 0' : '4rem 0 3rem' }}
                >
                    <div className="card-category" style={{ marginBottom: '0.5rem' }}>{article.category}</div>
                    <h1 className="story-title" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>{article.title}</h1>

                    <div style={{
                        display: 'flex',
                        flexDirection: windowWidth < 1024 ? 'column' : 'row',
                        alignItems: windowWidth < 1024 ? 'stretch' : 'center',
                        justifyContent: 'space-between',
                        gap: '2rem',
                        background: 'var(--color-surface)',
                        padding: '1.5rem 2rem',
                        marginTop: '2rem',
                        width: '100%',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-lg)',
                        boxShadow: 'var(--shadow-sm)'
                    }}>
                        {/* Left Side: Author & Meta */}
                        <div style={{
                            display: 'flex',
                            flexDirection: windowWidth < 640 ? 'column' : 'row',
                            alignItems: windowWidth < 640 ? 'flex-start' : 'center',
                            gap: '2.5rem',
                        }}>
                            {/* Author */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <img
                                    src="/harsh-mahto.jpg"
                                    alt={article.author}
                                    style={{
                                        width: '48px',
                                        height: '48px',
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                        border: '1px solid var(--color-border)',
                                    }}
                                />
                                <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.4' }}>
                                    <span style={{ fontSize: '0.65rem', color: 'var(--color-text-tertiary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Written by</span>
                                    <span style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>{article.author}</span>
                                </div>
                            </div>

                            <div style={{ width: '1px', height: '32px', background: 'var(--color-border)' }} className="hidden-mobile"></div>

                            {/* Date, Time & Reads */}
                            <div style={{
                                display: 'flex',
                                gap: '2rem',
                                flexWrap: 'nowrap',
                                overflowX: windowWidth < 640 ? 'auto' : 'visible',
                                paddingBottom: windowWidth < 640 ? '4px' : '0',
                                scrollbarWidth: 'none'
                            }}>
                                <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.4' }}>
                                    <span style={{ fontSize: '0.65rem', color: 'var(--color-text-tertiary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Published</span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-text-secondary)', fontSize: '0.9rem', fontWeight: 500 }}>
                                        <span>{article.date}</span>
                                    </div>
                                </div>
                                {article.lastUpdated && (
                                    <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.4' }}>
                                        <span style={{ fontSize: '0.65rem', color: 'var(--color-text-tertiary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Updated</span>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-text-secondary)', fontSize: '0.9rem', fontWeight: 500 }}>
                                            <RotateCw size={14} style={{ color: '#2563eb' }} />
                                            <span>{article.lastUpdated}</span>
                                        </div>
                                    </div>
                                )}
                                <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.4' }}>
                                    <span style={{ fontSize: '0.65rem', color: 'var(--color-text-tertiary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Duration</span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-text-secondary)', fontSize: '0.9rem', fontWeight: 500 }}>
                                        <span>{readTime}</span>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.4' }}>
                                    <span style={{ fontSize: '0.65rem', color: 'var(--color-text-tertiary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Audience</span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-text-secondary)', fontSize: '0.9rem', fontWeight: 500 }}>
                                        <span>{formatViews(article.views)} reads</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Listen Button */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <button
                                onClick={handleToggleSpeech}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    padding: '0.75rem 1.5rem',
                                    borderRadius: 'var(--radius-FULL)',
                                    background: isSpeaking ? 'var(--color-accent)' : 'transparent',
                                    color: isSpeaking ? '#fff' : 'var(--color-text-primary)',
                                    border: '1px solid var(--color-border)',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    fontWeight: 600,
                                    fontSize: '0.95rem',
                                    whiteSpace: 'nowrap'
                                }}
                                className="narrator-btn"
                            >
                                {isSpeaking ? (
                                    <>
                                        {isPaused ? <Play size={18} fill="white" /> : <div className=""><Pause size={18} fill="white" /></div>}
                                        <span>{isPaused ? 'Paused' : 'Listening...'}</span>
                                    </>
                                ) : (
                                    <>
                                        <Volume2 size={18} />
                                        <span>Listen to story</span>
                                    </>
                                )}
                            </button>
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
                >
                    {useMemo(() => {
                        const hasIframe = article.content.includes('<iframe');

                        if (hasIframe && !isVideoPlaying) {
                            const contentWithOverlay = article.content.replace(
                                /<div style="margin: 0 0 2.5rem 0;[^>]*>([\s\S]*?)<\/div>/,
                                (match) => `
                                    <div class="video-sync-wrapper" style="margin: 0 0 2.5rem 0; border-radius: 12px; overflow: hidden; position: relative; background: #000; cursor: pointer; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);">
                                        <div class="video-overlay" id="video-play-overlay" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 10; background: rgba(0,0,0,0.4); display: flex; flex-direction: column; align-items: center; justify-content: center; backdrop-filter: blur(4px); transition: all 0.3s ease;">
                                            <div style="width: 70px; height: 70px; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 25px rgba(0,0,0,0.3); transition: transform 0.2s;">
                                                <svg width="30" height="30" viewBox="0 0 24 24" fill="black"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                                            </div>
                                            <p style="color: white; margin-top: 1rem; font-weight: 700; font-family: sans-serif; font-size: 1rem; text-shadow: 0 2px 4px rgba(0,0,0,0.5);">Click to Play Video & AI Narrator</p>
                                        </div>
                                        ${match}
                                    </div>
                                `
                            );
                            return <div dangerouslySetInnerHTML={{ __html: contentWithOverlay }} onClick={(e) => {
                                if (e.target.closest('#video-play-overlay')) {
                                    handlePlayVideo();
                                }
                            }} />;
                        }

                        if (hasIframe && isVideoPlaying) {
                            const playingContent = article.content.replace(
                                /src="([^"]*)"/,
                                (match, src) => `src="${src}${src.includes('?') ? '&' : '?'}autoplay=1"`
                            );
                            return <div dangerouslySetInnerHTML={{ __html: playingContent }} />;
                        }

                        return <div dangerouslySetInnerHTML={{ __html: article.content }} />;
                    }, [article.content, article.id, isVideoPlaying])}
                </Motion.div>

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
            </div>

            {/* Reading Bar */}
            {isSpeaking && (
                <Motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    style={{
                        position: 'fixed',
                        bottom: windowWidth < 768 ? '12px' : '24px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: windowWidth < 768 ? '95%' : '90%',
                        maxWidth: '800px',
                        background: 'rgba(255, 255, 255, 0.98)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(99, 102, 241, 0.25)',
                        borderRadius: windowWidth < 768 ? '20px' : '24px',
                        padding: windowWidth < 768 ? '1rem' : '1.25rem 2rem',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)',
                        zIndex: 1000,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.75rem',
                        textAlign: 'center'
                    }}
                >
                    <div style={{
                        fontSize: windowWidth < 768 ? '0.9rem' : '1.1rem',
                        lineHeight: '1.5',
                        color: '#1f2937',
                        fontWeight: 500,
                        fontFamily: 'var(--font-serif)',
                        maxHeight: windowWidth < 768 ? '70px' : 'none',
                        overflowY: 'auto'
                    }}>
                        {allChunks[currentChunkIndex] ? (
                            <>
                                <span style={{ color: '#4f46e5', fontWeight: 700 }}>
                                    {allChunks[currentChunkIndex].substring(0, currentWordInfo.offset)}
                                </span>
                                {currentWordInfo.length > 0 && (
                                    <Motion.span
                                        animate={{ scale: [1, 1.05, 1] }}
                                        transition={{ duration: 0.2 }}
                                        style={{
                                            background: '#fbbf24', // Vivid Amber Yellow
                                            color: '#000',
                                            padding: '2px 4px',
                                            borderRadius: '4px',
                                            fontWeight: 800,
                                            boxShadow: '0 4px 12px rgba(251, 191, 36, 0.3)',
                                            display: 'inline-block'
                                        }}
                                    >
                                        {allChunks[currentChunkIndex].substring(currentWordInfo.offset, currentWordInfo.offset + currentWordInfo.length)}
                                    </Motion.span>
                                )}
                                <span style={{ color: '#9ca3af', fontWeight: 400 }}>
                                    {allChunks[currentChunkIndex].substring(currentWordInfo.offset + currentWordInfo.length)}
                                </span>
                            </>
                        ) : 'Preparing narration...'}
                    </div>

                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: windowWidth < 480 ? '1.5rem' : '2.5rem',
                        borderTop: '1px solid #f3f4f6',
                        paddingTop: '0.75rem'
                    }}>
                        <button onClick={handleToggleSpeech} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6366f1' }}>
                            {isPaused ? <Play size={24} fill="currentColor" /> : <Pause size={24} fill="currentColor" />}
                        </button>
                        <button onClick={handleStopSpeech} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444' }}>
                            <RotateCcw size={20} />
                        </button>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            {windowWidth < 480 ? 'Narrator' : 'AI Narrator Active'}
                        </div>
                    </div>
                </Motion.div>
            )}

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
                            padding: '1rem'
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
        </article>
    );
}

export default ArticleView;
