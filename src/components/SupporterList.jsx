import React, { useRef, useEffect, useState, useMemo } from 'react';

// Raw data - usually fetched from an API
const rawSupporters = [
    { name: "Akash Sharma", amount: 2000 },
    { name: "Prakash Singh", amount: 1000 },
    { name: "Priyanka Bhattacharya", amount: 1000 },
    { name: "Vijay Srivastav", amount: 1000 },
    { name: "Kabir", amount: 1000 },
    { name: "Noor Khan", amount: 500 },
    { name: "Pawan", amount: 100 },
    { name: "Aesha", amount: 100 },
    { name: "Prakash Tyagi", amount: 100 },
    { name: "Praveen", amount: 100 },
    { name: "Komal", amount: 100 },
    { name: "Vijay Prasad", amount: 1000 },
    { name: "Satyam Tripathi", amount: 1000 },
    { name: "Vikas yadav", amount: 1000 },
    { name: "Mohit Kushwaha", amount: 1000 },
    { name: "Sammer", amount: 2000 },
    { name: "Rohan Pandit", amount: 2000 },
    { name: "Sumit Tiwari", amount: 5000 },
];

const calculateStars = (amount) => {
    if (amount >= 4000) return 3;
    if (amount >= 2000) return 2;
    if (amount >= 1000) return 1;
    return 0;
};

const renderStars = (count) => {
    if (count === 0) return null;
    return <span style={{ color: '#fbbf24', marginLeft: '6px', fontSize: '0.9em' }}>{'⭐'.repeat(count)}</span>;
};

const SupporterList = () => {
    // Process and sort data
    const processedSupporters = useMemo(() => {
        return rawSupporters.map(s => ({
            ...s,
            stars: calculateStars(s.amount)
        })).sort((a, b) => {
            // Sort by Stars (descending) -> Amount (descending) -> Name (optional)
            if (b.stars !== a.stars) return b.stars - a.stars;
            return b.amount - a.amount;
        });
    }, []);

    // Duplicate list for seamless loop illusion
    const displayList = [...processedSupporters, ...processedSupporters];
    const scrollRef = useRef(null);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        let animationFrameId;

        // Anti-gravity scroll logic
        const scroll = () => {
            if (!isPaused) {
                // 0.5 is a safer minimum speed for consistent cross-browser scrolling
                scrollContainer.scrollTop += 0.5;

                // Robust loop reset
                // If we have scrolled past roughly half the content (the original list), reset to 0
                if (scrollContainer.scrollTop >= (scrollContainer.scrollHeight - scrollContainer.clientHeight) / 2) {
                    // If we are just looping the same content twice, 
                    // a safer reset point is often simply scrollHeight / 2 if the content is perfectly duplicated.
                    // However, to be safe with padding:
                    if (scrollContainer.scrollTop >= scrollContainer.scrollHeight / 2) {
                        scrollContainer.scrollTop = 0;
                    }
                }
            }
            animationFrameId = requestAnimationFrame(scroll);
        };

        animationFrameId = requestAnimationFrame(scroll);

        return () => cancelAnimationFrame(animationFrameId);
    }, [isPaused]);

    return (
        <div style={{
            background: '#0a0a0a',
            color: '#e5e5e5',
            padding: '3rem 1.5rem',
            borderRadius: '16px',
            marginTop: '2rem',
            marginBottom: '4rem',
            textAlign: 'center',
            position: 'relative',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto',
            boxShadow: '0 10px 40px -10px rgba(0,0,0,0.5)', // Deeper shadow
            overflow: 'hidden',
            border: '1px solid #1a1a1a' // Very subtle border for structure
        }}>
            {/* Embedded styles for custom scrollbar */}
            <style>
                {`
                    .supporter-scroll::-webkit-scrollbar {
                        width: 4px; /* Thinner for elegance */
                    }
                    .supporter-scroll::-webkit-scrollbar-track {
                        background: transparent;
                    }
                    .supporter-scroll::-webkit-scrollbar-thumb {
                        background: #333;
                        border-radius: 4px;
                    }
                    .supporter-scroll::-webkit-scrollbar-thumb:hover {
                        background: #555;
                    }
                `}
            </style>

            <h3 style={{
                marginBottom: '2rem',
                fontSize: '1.25rem',
                fontWeight: '600',
                color: '#ffffff',
                letterSpacing: '0.04em', // More premium letter spacing
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
            }}>
                Shout-out to Our Supporters ❤️
            </h3>

            {/* Scroll Area */}
            <div
                ref={scrollRef}
                className="supporter-scroll"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onTouchStart={() => setIsPaused(true)}
                onTouchEnd={() => setIsPaused(false)}
                style={{
                    height: '260px', // Slightly taller
                    overflowY: 'auto',
                    position: 'relative',
                    // Smoother fade masks
                    maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#333 transparent'
                }}
            >
                <div style={{ paddingBottom: '1rem' }}>
                    {displayList.map((s, index) => (
                        <div key={index} style={{
                            padding: '12px 0', // More breathing room
                            fontSize: s.stars >= 2 ? '1.1rem' : '1rem', // Subtle size bump for top stars
                            fontWeight: s.stars >= 2 ? '500' : '400',
                            color: '#d4d4d4',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '8px',
                            fontFamily: 'serif',
                            opacity: s.stars === 0 ? 0.8 : 1 // Slight fade for non-starred to make stars pop
                        }}>
                            <span style={{ color: '#f5f5f5' }}>
                                {s.name}
                                {renderStars(s.stars)}
                            </span>
                            <span style={{ color: '#525252', fontSize: '0.8em', margin: '0 4px' }}>—</span>
                            <span style={{ color: '#a3a3a3' }}>₹{s.amount}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div style={{
                marginTop: '2rem',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem'
            }}>
                <p style={{
                    fontSize: '0.7rem',
                    color: '#525252',
                    fontStyle: 'italic',
                    maxWidth: '80%',
                    lineHeight: '1.4'
                }}>
                    Stars reflect long-term support and belief in this work.
                </p>

                <p style={{
                    fontSize: '0.8rem',
                    color: '#737373',
                    marginTop: '0.5rem'
                }}>
                    This platform exists because of you.
                </p>
            </div>
        </div>
    );
};

export default SupporterList;
