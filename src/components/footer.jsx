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
        <div className="bet-footer-tx-001-div">
            <p className="bet-footer-tx-001">Copyright © 2019 - 2025 Clutchden. All rights reserved and protected by law.</p>
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
