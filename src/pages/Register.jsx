// src/pages/Register.jsx
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Navbar from '../components/Navbar';
import '../styles/register.css'
import NameIcon from '../assets/profileblackicon.svg'
import emailIcon from '../assets/emailicon1.svg'
import passwordIcon from '../assets/password.svg'
import "../styles/button.css"

export default function Register() {
  const { register } = useAuth();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [ShowMassagePopup, setShowmassagePopup ] = useState(false);

  const handleCloseMassagePopup = () => {
    setShowmassagePopup(false);
  };

  const handleChange = (e) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await register(form);
    setLoading(false);

    if (!res.success) {
      setError(res.error);
    }
    // success navigates inside AuthContext to /verify-email
  };

  return (
    <div >
      <div> <Navbar /> </div>

      <div className="containnerofrejister">
        <div className="top-content" 
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "20px"
          }}
        >
          <h1 className="thelogintx"> Register </h1>
        </div>
        {/* the introduction and the registration form */}

        <div className="conseptcover" style={{color: "white"}}>
          

            <div className="consept1">
              <div style={{display: "grid", gridTemplateRows: "auto auto auto", gap: "40px", padding: "20px 60px"}}>
                <h3 className="sitctx">Sign in to continue</h3>
                <span className="strook" />
                <p>Clutchden the home of street built sports picks. <br /> Take over the Leaderboard. </p>

                <div className="LMbtn" >
                  <p >
                    {" "}
                    <span
                      onClick={() => (window.location.href = "/terms-of-service")}
                      className="LearnMoreBtn"
                    >
                      Learn More
                    </span>
                  </p>
                </div>
              </div>
            </div>


            <div className="consept2">
              <div className="signincontainer">
                <div className="signincontainer1">
                  <h3 className="welc-txt" style={{color: "#3a3a3aff"}}> Welcome to Clutchden </h3>

                  <form onSubmit={handleSubmit} className="login-form-container">
                    <div className="input-txt">
                      <img src={NameIcon} alt="username" className="loginsystemicon"/>
                      <input
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        placeholder="Username"
                        required
                        className={`form ${error ? "input-error" : ""}`}
                      />
                    </div>
                    <div className="input-txt">
                      <img src={emailIcon} alt="email" className="loginsystemicon"/>
                      <input
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Email"
                        type="email"
                        required
                        className="form"
                      />
                    </div>
                    <div className="input-txt">
                      <img src={passwordIcon} alt="password" className="loginsystemicon"/>
                      <input
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Password"
                        type="password"
                        required
                        className="form"
                      />
                    </div>
   
                    <div className="form2" >
                      <button disabled={loading} className="register-btn">
                        {loading ? "Creating..." : "Register"}
                      </button>
                    </div>
                  </form>

                  <div className="toptx1">
                    <p className="reftx1" 
                      style={{
                        color: "#3a3a3aff", 
                        textAlign: "center", 
                        marginTop: "20px", 
                        display: "flex", 
                        justifyContent: "center"
                      }}
                    >
                      Already Registered? {" "}
                      <span
                       onClick={() => (window.location.href = "/login")}
                        className="signupref"
                        style={{marginLeft: "5px"}}
                      >
                        Login
                      </span>
                    </p>
                  </div>

                </div>
              </div>
            </div>

          </div>
        
      </div>

      {ShowMassagePopup && (
        <div className="ep-overlay" >
          <div className="ep-modal" onClick={(e) => e.stopPropagation()}>
            <div className="ep-header">
              <h3>Message!</h3>
              <button className="ep-close" onClick={handleCloseMassagePopup}>×</button>
            </div>
                      
            {/* FIXED — replaced the error-causing line */}
            {error && <p >{error}</p>}
            <div className="ep-actions">
              <button className="ep-btn" onClick={handleCloseMassagePopup}>OK</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}