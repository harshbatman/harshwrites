import React, { useRef, useEffect, useState, useMemo } from 'react';

// Raw data - usually fetched from an API
const rawSupporters = [
    { name: "Akash Sharma", amount: 2000 },
    { name: "Prakash Singh", amount: 1000 },
    { name: "Priyanka Bhattacharya", amount: 1000 },
    { name: "Vijay Srivastav", amount: 1000 },
    { name: "Viraj", amount: 1000 },
    { name: "Noor Khan", amount: 500 },
    { name: "Poonam", amount: 100 },
    { name: "Aesha Singh", amount: 2000 },
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
    { name: "Kusum", amount: 1000 },
    { name: "Bhavya", amount: 1000 },
    { name: "Neha", amount: 1000 },
    { name: "Manjeet singh", amount: 2000 },
    { name: "Sneha Srinivas", amount: 1000 },
    { name: "Subhas", amount: 500 },
    { name: "Ritik Singh", amount: 500 },
    { name: "Himanshu", amount: 500 },
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
        // Defined ranking for specific sorting requirements when amounts are equal
        const customRank = {
            "Manjeet singh": 1,
            "Sammer": 2,
            "Aesha Singh": 3,
            "Akash Sharma": 99,

            // 1000 Tier - Alternating Boy/Girl Order
            "Prakash Singh": 101,          // Boy
            "Priyanka Bhattacharya": 102, // Girl
            "Vijay Srivastav": 103,       // Boy
            "Kusum": 104,                 // Girl
            "Viraj": 105,                 // Boy
            "Bhavya": 106,                // Girl
            "Vijay Prasad": 107,          // Boy
            "Neha": 108,                  // Girl
            "Satyam Tripathi": 109,       // Boy
            "Sneha Srinivas": 110,        // Girl
            "Vikas yadav": 111,           // Boy
            "Mohit Kushwaha": 112         // Boy
        };

        return rawSupporters.map(s => ({
            ...s,
            name: `${s.name} Ji`, // Display name with Ji
            rawName: s.name,      // Raw name for sorting logic
            stars: calculateStars(s.amount)
        })).sort((a, b) => {
            // 1. Sort by Stars (descending)
            if (b.stars !== a.stars) return b.stars - a.stars;

            // 2. Sort by Amount (descending)
            if (b.amount !== a.amount) return b.amount - a.amount;

            // 3. Custom Rank if available (ascending rank means top of list)
            const rankA = customRank[a.rawName] || 50; // Default rank 50 (middle)
            const rankB = customRank[b.rawName] || 50;

            if (rankA !== rankB) return rankA - rankB;

            return 0;
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
        let scrollPos = scrollContainer.scrollTop; // Use a local float variable to track position

        const scroll = () => {
            if (!isPaused) {
                scrollPos += 0.8; // Increased speed slightly and using float

                // If we've scrolled past the first set of items (half the total height), reset to 0
                // We use a small buffer to ensure we don't reset too early or late
                if (scrollPos >= scrollContainer.scrollHeight / 2) {
                    scrollPos = 0;
                }

                scrollContainer.scrollTop = scrollPos;
            } else {
                // If paused, update our tracker to match manual scroll position
                scrollPos = scrollContainer.scrollTop;
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
                Shout-out to Our Supporters <span className="beating-heart">❤️</span>
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
