import React, { useState } from 'react';
import './InvitePlayer.scss'; // Import the SCSS file

export default function InvitePlayer() {
    const [copied, setCopied] = useState(false);

    const copyLink = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 3000); // Reset copied state after 3 seconds
            })
            .catch((error) => {
                console.error('Error copying link:', error);
            });
    };

    return (
        <div className="invite-player-container">
            <button className={`copy-link-button ${copied ? 'copied' : ''}`} onClick={copyLink}>
                {copied ? 'Link Copied!' : 'Copy Link'}
            </button>
            <p className="url-display">{window.location.href}</p>
        </div>
    );
}
