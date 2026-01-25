import React from 'react';
import { motion } from 'framer-motion';

const supporters = [
    { name: "Akash Sharma", amount: "₹2000" },
    { name: "Prakash Singh", amount: "₹1000" },
    { name: "Priyanka Tyagi", amount: "₹1000" },
    { name: "Vijay Srivastav", amount: "₹1000" },
    { name: "Kabir Kumar", amount: "₹1000" },
    { name: "Noor Khan", amount: "₹500" },
    { name: "Pawan Kumar", amount: "₹100" },
    { name: "Ayesha", amount: "₹100" },
    { name: "Prakash Tyagi", amount: "₹100" },
];

const SupporterList = () => {
    // Duplicate list for seamless loop
    const displayList = [...supporters, ...supporters];

    return (
        <div style={{
            background: '#0a0a0a', // Deep black for premium feel
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
            {/* Heading - Fixed */}
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

            {/* Scroll Area - Masked for fade effect */}
            <div style={{
                height: '240px',
                overflow: 'hidden',
                position: 'relative',
                // Mask for fade in/out effect at top and bottom
                maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)'
            }}>
                <motion.div
                    // Move from 0% to -50% (halfway) because we doubled the list
                    // This creates a seamless loop as the second half replaces the first half exactly
                    animate={{ y: ["0%", "-50%"] }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 30 // Slow, elegant speed
                    }}
                >
                    {displayList.map((s, index) => (
                        <div key={index} style={{
                            padding: '10px 0',
                            fontSize: '1.05rem',
                            color: '#d4d4d4',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '8px',
                            fontFamily: 'serif' // Giving it a slightly literary/story feel
                        }}>
                            <span style={{ fontWeight: 500, color: '#f5f5f5' }}>{s.name}</span>
                            <span style={{ color: '#525252', fontSize: '0.8em' }}>—</span>
                            <span style={{ color: '#a3a3a3' }}>{s.amount}</span>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Footer - Subtle Line */}
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
