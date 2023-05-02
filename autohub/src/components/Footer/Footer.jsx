import React from 'react';

import { footerLogo } from './images';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__body">
                    <div className="footer__logo">
                            <img src={footerLogo} alt="footer-logo" />
                    </div>

                    <div className="footer__social">
                        <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
                            <div className="footer__social--instagram social">
                                <i className="fab fa-instagram"></i>
                            </div>
                        </a>
                        <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
                            <div className="footer__social--facebook social">
                                <i className="fab fa-facebook-square"></i>
                            </div>
                        </a>
                        <a href="https://www.youtube.com/" target="_blank" rel="noreferrer">
                            <div className="footer__social--youtube social">
                                <i className="fab fa-youtube"></i>
                            </div>
                        </a>
                        <a href="https://www.google.com/" target="_blank" rel="noreferrer">
                            <div className="footer__social--google social">
                                <i className="fab fa-google"></i>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}