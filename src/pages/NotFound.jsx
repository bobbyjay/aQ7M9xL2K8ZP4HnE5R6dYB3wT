import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/notFound.css';

function NotFound() {
  return (
    <div className="notfound-container">
        <div>
            <div className="notfound-animation">
              404
            </div>
 
            <div className='opps-content'>
                <h1>Oops, sorry we can't find that page!</h1>
    
                <p className='opp-p-txt'>
                    Either something went wrong or the page doesn't exist anymore.
                </p>

                <Link to="/home" className="home-btn">
                    Go back to home
                </Link>
            </div>
        </div>
    </div>
  )
}

export default NotFound