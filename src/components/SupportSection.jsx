import React, { useState } from 'react';
import QRCode from 'react-qr-code';
import { Copy, Check } from 'lucide-react';

const SupportSection = () => {
    const [copied, setCopied] = useState(false);
    const upiId = "harshwrites@ibl";

    const handleCopy = () => {
        navigator.clipboard.writeText(upiId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div style={{
            marginTop: '4rem',
            marginBottom: '4rem',
            padding: '2rem',
            background: '#fafafa',
            borderRadius: '1rem',
            border: '1px solid #e5e7eb',
            textAlign: 'center'
        }}>
            <p style={{
                fontSize: '1.1rem',
                lineHeight: '1.7',
                color: '#374151',
                marginBottom: '2rem',
                maxWidth: '600px',
                marginLeft: 'auto',
                marginRight: 'auto',
                fontFamily: 'serif' // matching the likely article style or keeping it distinct
            }}>
                This website is intentionally ad-free.
                <br />
                I don’t like serving something to others that I wouldn’t consume myself.
                <br /><br />
                If you enjoy the stories or learn something here, and would like to support more such work, you can do so via UPI (
                <span style={{ fontWeight: '600', color: '#111' }}>{upiId}</span>
                <button
                    onClick={handleCopy}
                    style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        marginLeft: '4px',
                        verticalAlign: 'middle',
                        padding: '4px',
                        borderRadius: '4px',
                        color: copied ? '#10b981' : '#6b7280',
                        transition: 'all 0.2s'
                    }}
                    title="Copy UPI ID"
                    aria-label="Copy UPI ID"
                >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                </button>
                ) or by scanning the QR code.
                <br />
                Supporters are acknowledged on the website.
                <br /><br />
                Thanks for being here ❤️
            </p>

            {/* PhonePe Style Card */}
            <div style={{
                background: 'white',
                maxWidth: '320px',
                margin: '0 auto',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                padding: '2rem 1.5rem',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
                    <div style={{
                        width: '32px',
                        height: '32px',
                        background: '#5f259f',
                        borderRadius: '8px',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        fontSize: '18px'
                    }}>
                        पे
                    </div>
                    <span style={{ fontSize: '18px', fontWeight: '600', color: '#1a1a1a' }}>PhonePe</span>
                </div>

                <div style={{ color: '#5f259f', fontWeight: '700', fontSize: '14px', letterSpacing: '0.5px', marginBottom: '20px' }}>
                    ACCEPTED HERE
                </div>

                <div style={{ color: '#1a1a1a', fontSize: '14px', marginBottom: '16px' }}>
                    Scan any QR using PhonePe App
                </div>

                {/* QR Code */}
                <div style={{
                    position: 'relative',
                    width: '200px',
                    height: '200px',
                    margin: '0 auto 20px auto'
                }}>
                    <QRCode
                        value={`upi://pay?pa=${upiId}&pn=Harsh%20Kumar%20Mahto`}
                        size={200}
                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                        viewBox={`0 0 256 256`}
                    />
                    {/* Center Overlay */}
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        background: 'white',
                        padding: '4px',
                        borderRadius: '50%'
                    }}>
                        <div style={{
                            width: '32px',
                            height: '32px',
                            background: '#1a1a1a',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white', // Changed to white text on black circle as per screenshot which has a black/dark center icon
                            border: '1px solid white'
                        }}>
                            <span style={{ fontSize: '18px', fontWeight: 'bold' }}>पे</span>
                        </div>
                    </div>
                </div>

                <div style={{ fontWeight: '600', fontSize: '16px', color: '#1a1a1a', marginBottom: '30px' }}>
                    Harsh Kumar Mahto
                </div>

                {/* Footer */}
                <div style={{ fontSize: '10px', color: '#9ca3af', marginTop: 'auto' }}>
                    ©2023, All rights reserved, PhonePe Internet Pvt. Ltd.
                </div>
            </div>
        </div>
    );
};

export default SupportSection;
