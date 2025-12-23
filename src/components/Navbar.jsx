import { Link } from "react-router-dom";
import { useMenu } from "../context/MenuContext";

import HelpCenter from '../assets/help.svg';
import ProfileIcon from '../assets/ProfileIcon.svg';
import HomePageIcon from '../assets/homepage.svg';
import LadderChallengeIcon from '../assets/LadderChallenge.svg';
import menubar from '../assets/menubar.svg';

import "../styles/Navbarstyle.css";
import "../styles/button.css";

export default function Navbar() {
  const { showMenuBar, setShowMenuBar } = useMenu(); // ← context

  const handleOpenMenuBar = () => setShowMenuBar(true);
  const handleCloseMenuBar = () => setShowMenuBar(false);



  return (
    <nav className="thenavbar">

      <div className="menuleb" >
        <div className="menu-bar-span-con">
          <div className="menuicone" >
            <div className="menu-bar-line" onClick={handleOpenMenuBar}>
              ☰
            </div>
          </div>
        </div>
      </div>

      <div className="navbaroptions1">
        <div className="navbaroptions">
          <Link to="/" className="nav-op-txt">
            <span className="nav-op-ani"></span>
            <div className="bx-cycoani">Home</div>
          </Link>
          <Link to="/bets" className="nav-op-txt">
            <span className="nav-op-ani"></span>
            <div className="bx-cycoani">Events</div>
          </Link>
          <Link to="/support-page" className="nav-op-txt">
            <span className="nav-op-ani"></span>
            <div className="bx-cycoani">Help Center</div>
          </Link>
          <Link to="/Profile" className="nav-op-txt">
            <span className="nav-op-ani"></span>
            <div className="bx-cycoani">Profile</div>
          </Link>
          <Link to="/sports" className="nav-op-txt">
            <span className="nav-op-ani"></span>
            <div className="bx-cycoani">Sports</div>
          </Link>
        </div>
      </div>

      {showMenuBar && (
        <>
          <div className="menu-overlay" onClick={handleCloseMenuBar}></div>

          <div className="navbaroptions4">
            <div className="navbaroptions4">
              <div className="menuscrollcover">
                <Link to="/" className="menucover" onClick={handleCloseMenuBar}>
                  <img src={HomePageIcon} alt="Home" className="hanbugoicon" />
                  <h3 className="txmenu">Home</h3>
                </Link>

                <Link to="/bets" className="menucover" onClick={handleCloseMenuBar}>
                  <img src={LadderChallengeIcon} alt="Challenge" className="hanbugoicon" />
                  <h3 className="txmenu">Events</h3>
                </Link>

                <Link to="/support-page" className="menucover" onClick={handleCloseMenuBar}>
                  <img src={HelpCenter} alt="Help" className="hanbugoicon" />
                  <h3 className="txmenu">Help Center</h3>
                </Link>

                <Link to="/Profile" className="menucover" onClick={handleCloseMenuBar}>
                  <img src={ProfileIcon} alt="profile" className="hanbugoicon" />
                  <h3 className="txmenu">Profile</h3>
                </Link>

                <Link to="/sports" className="menucover" onClick={handleCloseMenuBar}>
                  <img src={menubar} alt="sports" className="hanbugoicon" />
                  <h3 className="txmenu">Sports</h3>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
