import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Navbar from '../components/Navbar';
import '../styles/login.css'
import '../styles/button.css'
import emailIcon from '../assets/emailicon1.svg'
import passwordIcon from '../assets/password.svg'

export default function Login() {
  const { login } = useAuth();

  const [form, setForm] = useState({ 
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [ShowMassagePopup, setShowmassagePopup ] = useState(false);
  

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setError(""); // clear error while typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setShowmassagePopup(false);
    setLoading(true);

    // REQUIRED CHECK (popup message)
    if (!form.email.trim()) {
      setError("Email address is required to continue.");
      setShowmassagePopup(true);
      setLoading(false);
      return;
    }
 
    // EMAIL FORMAT CHECK (popup message)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email.trim())) {
      setError("Please enter a valid email address.");
      setShowmassagePopup(true);
      setLoading(false);
      return;
    }
  
    try {
      const result = await login({
        email: form.email.trim(),
        password: form.password.trim(),
      });
  
      if (!result.success) {
        setError(result.error || "Invalid email or password.");
        setShowmassagePopup(true);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setShowmassagePopup(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseMassagePopup = () => {
    setShowmassagePopup(false)
  };

  return (
    <div className="login-body-container" >
      <div><Navbar /></div>        

      <div style={{color: "white"}}>
        <div className="top-content" 
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "20px"
          }}
        >
          <h1 className="thelogintx"> Login </h1>
        </div>

        <div className="conseptcover">
          
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
                <h3 className="welc-txt" style={{color: "#3a3a3aff"}}>Welcome back to Clutchden</h3>
                
                <form onSubmit={handleSubmit} className="login-form-container" >
                  <div className="input-txt">
                    <img src={emailIcon} alt="email" className="loginsystemicon" />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className={`form ${error ? "input-error" : ""}`}
                    />
                  </div>
                  <div className="input-txt">
                    <img src={passwordIcon} alt="password" className="loginsystemicon"/>
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={form.password}
                      onChange={handleChange}
                      required
                      className="form"
                    />
                  </div>

                  <div className="form2" >
                    <button type="submit" disabled={loading} className="register-btn">
                      {loading ? "Signing in..." : "Login"}
                    </button>
                  </div>
                </form>

                <p className="reftx1" style={{color: "#3a3a3aff"}}>
                  Don’t have an account?{" "}
                  <span onClick={() => (window.location.href = "/register")} className="signupref" >
                    Sign Up
                  </span>
                </p>
              </div>
            </div>

          </div>
 
          <div className="LMbtn1" >
            <p className="LMbtncover" >
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

      {ShowMassagePopup && (
        <div className="ep-overlay" >
          <div className="ep-modal" onClick={(e) => e.stopPropagation()}>
            <div className="ep-header">
              <h3>Message!</h3>
              <button className="ep-close" onClick={handleCloseMassagePopup}>×</button>
            </div>
                      
            {/* FIXED — replaced the error-causing line */}
            {error && <p className="error001">{error}</p>}
            <div className="ep-actions">
              <button className="ep-btn" onClick={handleCloseMassagePopup}>OK</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}