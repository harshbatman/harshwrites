import React, { useRef, useEffect, useState } from 'react';

const supporters = [
    { name: "Akash Sharma", amount: "₹2000" },
    { name: "Prakash Singh", amount: "₹1000" },
    { name: "Priyanka Bhattacharya", amount: "₹1000" },
    { name: "Vijay Srivastav", amount: "₹1000" },
    { name: "Kabir Kumar", amount: "₹1000" },
    { name: "Noor Khan", amount: "₹500" },
    { name: "Pawan Kumar", amount: "₹100" },
    { name: "Aesha", amount: "₹100" },
    { name: "Prakash Tyagi", amount: "₹100" },
    { name: "Praveen", amount: "₹100" },
];

const SupporterList = () => {
    // Duplicate list for seamless loop illusion
    const displayList = [...supporters, ...supporters];
    const scrollRef = useRef(null);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        let animationFrameId;

        // Anti-gravity scroll logic
        const scroll = () => {
            if (!isPaused) {
                // Adjust speed: smaller number = slower
                // 0.5 is a very slow, elegant drift
                scrollContainer.scrollTop += 0.5;

                // Check if we've reached the halfway point (end of first list)
                // We assume the list is duplicated exactly once
                // scrollHeight is total height, clientHeight is visible height
                // Roughly, if scrollTop >= (scrollHeight / 2), we jump back to 0
                // We need to be careful with exact math, but for visual looping of identical content:
                // If we scroll past exactly half the scrollHeight, reset.
                if (scrollContainer.scrollTop >= scrollContainer.scrollHeight / 2) {
                    scrollContainer.scrollTop = 0;
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
            boxShadow: '0 10px 30px -10px rgba(0,0,0,0.3)',
            overflow: 'hidden'
        }}>
            {/* Embedded styles for custom scrollbar */}
            <style>
                {`
                    .supporter-scroll::-webkit-scrollbar {
                        width: 6px;
                    }
                    .supporter-scroll::-webkit-scrollbar-track {
                        background: #1a1a1a;
                        border-radius: 4px;
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
                letterSpacing: '0.02em',
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
                    height: '240px',
                    overflowY: 'auto', // Enable manual scroll
                    position: 'relative',
                    // Fade masks
                    maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
                    scrollbarWidth: 'thin', // Firefox
                    scrollbarColor: '#333 #1a1a1a' // Firefox
                }}
            >
                <div style={{ paddingBottom: '1rem' }}>
                    {displayList.map((s, index) => (
                        <div key={index} style={{
                            padding: '10px 0',
                            fontSize: '1.05rem',
                            color: '#d4d4d4',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '8px',
                            fontFamily: 'serif'
                        }}>
                            <span style={{ fontWeight: 500, color: '#f5f5f5' }}>{s.name}</span>
                            <span style={{ color: '#525252', fontSize: '0.8em' }}>—</span>
                            <span style={{ color: '#a3a3a3' }}>{s.amount}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div style={{
                marginTop: '1.5rem',
                display: 'flex',
                justifyContent: 'center'
            }}>
                <p style={{
                    fontSize: '0.8rem',
                    color: '#525252',
                    fontStyle: 'italic',
                    borderTop: '1px solid #262626',
                    paddingTop: '1rem',
                    paddingLeft: '2rem',
                    paddingRight: '2rem'
                }}>
                    This platform exists because of you.
                </p>
            </div>
        </div>
    );
};

export default SupporterList;
