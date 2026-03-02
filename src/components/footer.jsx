import React from 'react';
import logo from '../assets/cluch.svg';
import facebookLogo from '../assets/facebookLogo.svg';
import instagramLogo from '../assets/instagram.svg';
import twitterLogo from '../assets/twitter.svg';
import { Link } from "react-router-dom";
import '../styles/footer.css';

function footer() {
  return (
    <div className='footermaindiv'>
        <div className="bet-footer-1">
            <p className="bet-footer-txt-1">
                © 2026 Clutchden Analytics, LLC. All rights reserved. 
                <br /> Problem gambling follow us on social media.
            </p>
            <div className="bet-footer-socials-containner">
                <a href="https://www.facebook.com/clutchden" target="_blank" rel="noopener noreferrer">
                    <img src={facebookLogo} alt="Facebook" className="bet-footer-social-icon" />
                </a>
                <a href="https://www.instagram.com/clutchden.online?igsh=c2tvbHljOXdsd2g3" target="_blank" rel="noopener noreferrer">
                    <img src={instagramLogo} alt="Instagram" className="bet-footer-social-icon" />
                </a>
                <a href="https://twitter.com/clutchden" target="_blank" rel="noopener noreferrer">
                    <img src={twitterLogo} alt="Twitter" className="bet-footer-social-icon" />
                </a>
            </div>
        </div>
        
        <div style={{ display: "flex", justifyContent: "center"}}>
            <div className="bet-footer-tx-002-div">18+</div>
            <div className="bet-footer-tx-003-div">
                <Link to="/terms-of-service" className="bet-footer-tx-003"> Learn more about our Terms of Service </Link>
            </div>
        </div>
    </div>
  )
}

export default footer
