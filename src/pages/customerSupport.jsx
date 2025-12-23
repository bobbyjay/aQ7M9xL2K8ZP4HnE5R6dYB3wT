import React from 'react'
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import backIcon from "../assets/back.svg";
import "../styles/customerSupport.css";
import commentIcon from "../assets/comment.svg";
import emailIcon from "../assets/email.svg";
import contactIcon from "../assets/contact.svg";

const CustomerSupport = () => {
    const navigaten = useNavigate();

  return (
    <div className='cutmsppt'>
        <div>
        <header className='tos-header'>
            <div className="heading-containner-div-for-cutmsppt-1">
                <button onClick={() => navigaten(-1)} className="back-icon-btn">
                    <img src={backIcon} alt="back" className="back-icon-for-cutmsppt"/>
                </button>
            </div>

            <div className="heading-containner-div-for-cutmsppt-2">
                <h1 className="cutmsppt-heading-txt">CUSTOMER SUPPORT</h1>
            </div>
        </header>
        
        <main className='main-containner'>
            <Link to='/support' className='a-tag'>
                <section className='section-containner'>
                   <div className='content-div-cotainner'>
                        <div className='support-contact-icons-div'>
                            <img src={commentIcon} alt="Support" className='support-contact-icons'/>
                        </div>
                        <div className='article-div-containner'>
                            <article>
                                <h3>Customer support chat</h3>
                                <p>Ask any question directly on the website</p>
                            </article>
                        </div>
                        <div className='forwarder-for-main'>🠺</div>
                    </div>   
                </section>
            </Link>

            <a className='a-tag' href="mailto:support@clutchden.online">
                <section className='section-containner'>
                    <div className='content-div-cotainner'>
                        <div className='support-contact-icons-div'>
                            <img src={emailIcon} alt="email" className='support-contact-icons'/>
                        </div>
                        <div className='article-div-containner'>
                            <article>
                                <h3>Send us an Email</h3>
                                <p>Ask any question via email</p>
                            </article>
                        </div>
                        <div className='forwarder-for-main'>🠺</div>
                    </div>
                </section>
            </a>

            <section className='section-containner'>
                <div className='content-div-cotainner'>
                    <div className='support-contact-icons-div'>
                        <img src={contactIcon} alt="Contacts" className='support-contact-icons'/>
                    </div>
                    <div className='article-div-containner'>
                        <article>
                            <h3>Contacts</h3>
                            <p>We're here to answer your question 24/7</p>
                        </article>
                    </div>
                    <div className='forwarder-for-main'>🠺</div>
                </div>
            </section>
        </main>
        </div>
        <footer className='footer-for-cutmsppt'>
            <div className="bet-footer-tx-001-div">
                <p className="bet-footer-tx-001">Copyright © 2019 - 2025 Clutchden. All rights reserved and protected by law.</p>
            </div>

            <div style={{ display: "flex", justifyContent: "center"}}>
                <div className="bet-footer-tx-002-div">18+</div>
                <div className="bet-footer-tx-003-div">
                    <Link to="/terms-of-service" className="bet-footer-tx-003"> Learn more about our Terms of Service </Link>
                </div>
            </div>
        </footer>
    </div>
  )
}

export default CustomerSupport
