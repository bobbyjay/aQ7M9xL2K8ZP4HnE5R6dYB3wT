import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import clutchdenLogo from "../assets/cluch.svg";
import "../styles/deposit.css";
import "../styles/button.css";
import "../styles/errorPopup.css";

const DepositPage = () => {
  const { deposit, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [bankDetails, setBankDetails] = useState(null);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  // Redirect if not logged in
  useEffect(() => {
    if (!isAuthenticated) navigate("/login");
  }, [isAuthenticated, navigate]);

  const handleClosePopup = () => {
    setShowErrorPopup(false);
    setErrorMsg("");
  };

  const handleDeposit = async (e) => {
    e.preventDefault();

    if (!amount || Number(amount) <= 0) {
      setErrorMsg("Please enter a valid amount.");
      setShowErrorPopup(true);
      return;
    }

    setLoading(true);
    setErrorMsg("");
    setBankDetails(null);

    try {
      const data = await deposit(Number(amount));
      setLoading(false);

      // SERVER DOWN
      if (!data || data.status === 503) {
        setErrorMsg("Service temporarily unavailable. Try again shortly.");
        setShowErrorPopup(true);
        return;
      }

      // BANK DETAILS (success)
      if (data.accountName) {
        setBankDetails({
          accountName: data.accountName,
          bankName: data.bankName,
          accountNumber: data.accountNumber,
          currency: data.currency,
        });
        return;
      }

      // ERROR
      if (data.success === false) {
        setErrorMsg(data.message || "Deposit failed.");
        setShowErrorPopup(true);
        return;
      }

      // Unexpected
      setErrorMsg("Unexpected server response.");
      setShowErrorPopup(true);

    } catch (err) {
      setLoading(false);
      setErrorMsg("Unable to connect. Check your network.");
      setShowErrorPopup(true);
    }
  };

  return (
    <div>
      <div className="depositcontainner">
        <div className="cldiv">
          <img src={clutchdenLogo} alt="logo" className="clutchdenLogo" />
        </div>

        <div>
          <h2 className="dftx">Deposit Funds</h2>
        </div>

        <div className="outterformdiv">
          <form onSubmit={handleDeposit} className="formcontainer">
            <div>
              <label className="datx">Deposit Amount (USD)</label>
            </div>

            <input
              type="number"
              min="1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="inputboxcss"
              placeholder="Enter deposit amount"
            />

            <div className="btndiv">
              <button type="submit" disabled={loading} className="register-btn">
                {loading ? "Processing..." : "Request Deposit"}
              </button>
            </div>
          </form>
        </div>

        {bankDetails && (
          <div className="bank-details-box">
            <h3>Bank Details</h3>
            <p><strong>Account Name:</strong> {bankDetails.accountName}</p>
            <p><strong>Bank Name:</strong> {bankDetails.bankName}</p>
            <p><strong>Account Number:</strong> {bankDetails.accountNumber}</p>
            <p><strong>Currency:</strong> {bankDetails.currency}</p>
          </div>
        )}
      </div>

      {/* ERROR POPUP */}
      {showErrorPopup && (
        <div className="ep-overlay" onClick={handleClosePopup}>
          <div className="ep-modal" onClick={(e) => e.stopPropagation()}>
            <div className="ep-header">
              <h3>Error</h3>
              <button className="ep-close" onClick={handleClosePopup}>×</button>
            </div>

            <p >{errorMsg}</p>

            <div className="ep-actions">
              <button className="ep-btn" onClick={handleClosePopup}>OK</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepositPage;
