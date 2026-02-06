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
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                transition: 'color 0.2s',
                textAlign: 'center',
                maxWidth: '100px',
                lineHeight: '1.3',
                marginTop: '2px'
            }}>
                {app.id === 'mahto' ? 'MAHTO' : app.id === 'mine' ? 'mine' : app.id === 'loans' ? 'MAHTO Home Loans' : 'Properties'}
            </span>
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
                    fontSize: '18px',
                    fontWeight: '1000',
                    letterSpacing: '-0.02em',
                    fontFamily: 'var(--font-sans)',
                    color: '#fff',
                    textAlign: 'center',
                    WebkitFontSmoothing: 'antialiased',
                    display: 'block',
                    width: '100%',
                    padding: '0 4px'
                }}>MAHTO</span>
            )
        },
        {
            id: 'mine',
            name: 'mine',
            renderIcon: () => (
                <span style={{
                    fontSize: '42px',
                    fontWeight: '700',
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
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '1px',
                    width: '100%',
                    height: '100%'
                }}>
                    <span style={{
                        fontSize: '11px',
                        fontWeight: '1000',
                        letterSpacing: '0.04em',
                        color: '#fff',
                        textShadow: '0 1px 2px rgba(0,0,0,0.5)'
                    }}>MAHTO</span>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '2px',
                        transform: 'translateY(-1px)'
                    }}>
                        <div style={{ width: '22px', height: '22px' }}>
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 13L12 4L21 13" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.5))' }} />
                                <path d="M6 13V21H18V13H6Z" fill="white" style={{ filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.5))' }} />
                                <rect x="10.5" y="17" width="3" height="4" fill="#000" />
                            </svg>
                        </div>
                        <span style={{
                            fontSize: '16px',
                            fontWeight: '1000',
                            letterSpacing: '-0.04em',
                            color: '#fff',
                            textShadow: '0 1px 3px rgba(0,0,0,0.5)',
                            lineHeight: 0.9
                        }}>Loans</span>
                    </div>
                </div>
            )
        },
        {
            id: 'properties',
            name: 'MAHTO Land & Properties',
            renderIcon: () => (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span style={{ fontSize: '14px', fontWeight: '900', letterSpacing: '0.05em' }}>MAHTO</span>
                    <span style={{ fontSize: '8px', fontWeight: '600', marginTop: '2px', textAlign: 'center', opacity: 0.9 }}>Land and Properties</span>
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
