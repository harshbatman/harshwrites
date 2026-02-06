import React from 'react';
import { Home } from 'lucide-react';

const AppIcon = ({ app }) => {
    const [isHovered, setIsHovered] = React.useState(false);

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px',
                width: '100px',
                cursor: 'pointer'
            }}
        >
            <div style={{
                ...iconStyle,
                transform: isHovered ? 'translateY(-5px) scale(1.05)' : 'none',
                boxShadow: isHovered ? '0 20px 25px -5px rgba(0, 0, 0, 0.2)' : iconStyle.boxShadow
            }}>
                {app.renderIcon()}
            </div>
            <span style={{
                fontSize: '0.65rem',
                fontWeight: 700,
                color: isHovered ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                textTransform: app.id === 'mine' ? 'none' : 'uppercase',
                letterSpacing: '0.06em',
                transition: 'color 0.2s',
                textAlign: 'center',
                maxWidth: '100px',
                lineHeight: '1.3',
                marginTop: '2px'
            }}>
                {app.id === 'mahto' ? 'MAHTO' :
                    app.id === 'mine' ? 'mine' :
                        app.id === 'loans' ? (
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span>MAHTO</span>
                                <span>Home Loans</span>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span>MAHTO</span>
                                <span style={{ whiteSpace: 'nowrap' }}>Land & Properties</span>
                            </div>
                        )
                }
            </span>
            {app.id === 'mahto' && (
                <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                    <a
                        href="https://play.google.com/store/apps/details?id=tech.mahto.ma"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        style={{ display: 'flex', transition: 'transform 0.2s' }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 20.5V3.5C3 2.5 4.5 2 5.5 2.5L21 11C22 11.5 22 12.5 21 13L5.5 21.5C4.5 22 3 21.5 3 20.5Z" fill="#3B82F6" />
                            <path d="M3.6 2.5L15.3 11.6L3.6 20.8V2.5Z" fill="#10B981" fillOpacity="0.8" />
                            <path d="M15.3 11.6L21.3 10.8C21.8 11.1 21.8 11.8 21.3 12.2L15.3 11.6Z" fill="#FBBF24" />
                            <path d="M3.6 20.8L15.3 11.6L21.3 12.2L6.5 21.6C5.5 22.2 3.6 21.7 3.6 20.8Z" fill="#EF4444" fillOpacity="0.8" />
                        </svg>
                    </a>
                    <a
                        href="https://apps.apple.com/us/app/mahto-jobs-contract-shops/id6756539905"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        style={{ display: 'flex', transition: 'transform 0.2s' }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        <svg width="22" height="22" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                            <rect width="512" height="512" rx="100" fill="#007AFF" />
                            <path d="M367.6 308.1L423.6 405.1C427.6 412.1 425.2 421.1 418.2 425.1C411.2 429.1 402.2 426.7 398.2 419.7L343.8 325.5L168.2 325.5L113.8 419.7C109.8 426.7 100.8 429.1 93.8 425.1C86.8 421.1 84.4 412.1 88.4 405.1L144.4 308.1L367.6 308.1ZM256 122.3L325.6 242.8L186.4 242.8L256 122.3ZM256 70.3C263.8 70.3 271.4 73.8 276.5 79.9L467.5 309.9C472.6 316.1 471.2 325.3 464.3 330C457.5 334.6 448.3 333.3 443.6 326.4L256 100.7L68.4 326.4C63.7 333.3 54.5 334.6 47.7 330C40.8 325.3 39.4 316.1 44.5 309.9L235.5 79.9C240.6 73.8 248.2 70.3 256 70.3Z" fill="white" />
                        </svg>
                    </a>
                </div>
            )}
        </div>
    );
};

const MahtoOS = () => {
    const apps = [
        {
            id: 'mahto',
            name: 'MAHTO',
            renderIcon: () => (
                <span style={{
                    fontSize: '16px',
                    fontWeight: '1000',
                    letterSpacing: '0.02em',
                    fontFamily: 'var(--font-sans)',
                    color: '#fff',
                    textAlign: 'center',
                    WebkitFontSmoothing: 'antialiased'
                }}>MAHTO</span>
            )
        },
        {
            id: 'mine',
            name: 'mine',
            renderIcon: () => (
                <span style={{
                    fontSize: '42px',
                    fontWeight: '500',
                    fontFamily: 'var(--font-sans)',
                    lineHeight: 1,
                    marginBottom: '4px' // Optical adjustment for lower-case 'm'
                }}>m</span>
            )
        },
        {
            id: 'loans',
            name: 'MAHTO Home Loans',
            renderIcon: () => (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    transform: 'translateY(-1px)'
                }}>
                    <span style={{
                        fontSize: '11px',
                        fontWeight: '1000',
                        letterSpacing: '0.04em',
                        color: '#fff',
                        textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                        marginBottom: '-1px',
                        marginLeft: '1px'
                    }}>MAHTO</span>
                    <div style={{
                        display: 'flex',
                        alignItems: 'flex-end',
                        gap: '1px'
                    }}>
                        <div style={{ width: '22px', height: '22px', marginLeft: '-2px' }}>
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 11L12 4L20 11" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 8.5L5 14V22H19V14L12 8.5Z" fill="white" />
                                <path d="M10 22V18C10 17.4477 10.4477 17 11 17H13C13.5523 17 14 17.4477 14 18V22H10Z" fill="#000" />
                            </svg>
                        </div>
                        <span style={{
                            fontSize: '16px',
                            fontWeight: '1000',
                            letterSpacing: '-0.05em',
                            color: '#fff',
                            textShadow: '0 1px 3px rgba(0,0,0,0.5)',
                            lineHeight: 1
                        }}>Loans</span>
                    </div>
                </div>
            )
        },
        {
            id: 'properties',
            name: 'MAHTO Land & Properties',
            renderIcon: () => (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <span style={{
                        fontSize: '15px',
                        fontWeight: '1000',
                        letterSpacing: '0.02em',
                        color: '#fff',
                        lineHeight: '1.2'
                    }}>MAHTO</span>
                    <span style={{
                        fontSize: '7px',
                        fontWeight: '600',
                        color: '#fff',
                        letterSpacing: '0.02em',
                        whiteSpace: 'nowrap',
                        marginTop: '1px'
                    }}>Land & Properties</span>
                </div>
            )
        }
    ];

    return (
        <div style={{
            margin: '4rem 0',
            padding: '2.5rem',
            background: 'var(--color-surface)',
            borderRadius: '24px',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-lg)',
            textAlign: 'center'
        }}>
            <h3 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.5rem',
                marginBottom: '2rem',
                color: 'var(--color-text-primary)',
                fontWeight: 700
            }}>
                MAHTO - Home Building OS
            </h3>

            <div style={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                gap: '2.5rem'
            }}>
                {apps.map(app => (
                    <AppIcon key={app.id} app={app} />
                ))}
            </div>
        </div>
    );
};

const iconStyle = {
    width: '72px',
    height: '72px',
    background: '#000000', // True Black
    borderRadius: '16px', // iOS style rounded corners
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    border: '1px solid rgba(255,255,255,0.1)',
    overflow: 'hidden'
};

export default MahtoOS;
