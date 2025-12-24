import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/errorPopup.css";
import clutchdenLogo from "../assets/cluch.svg";

const walletTypes = [
  "Trust Wallet",
  "PayPal",
  "Coinbase",
  "Binance",
  "Apple Pay",
];

const WithdrawalPage = () => {
  const { withdraw } = useContext(AuthContext);

  const [amount, setAmount] = useState("");
  const [walletType, setWalletType] = useState(walletTypes[0]);
  const [walletAddress, setWalletAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const handleClosePopup = () => {
    setShowErrorPopup(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || !walletAddress) {
      setResponseMsg("Please fill all fields.");
      setShowErrorPopup(true);
      return;
    }

    setLoading(true);
    setResponseMsg("");

    const result = await withdraw({
      amount: Number(amount),
      walletType,
      walletAddress,
    });

    setLoading(false);
    setResponseMsg(result.message || "Something went wrong.");
    setShowErrorPopup(true);

    if (result.success) {
      setAmount("");
      setWalletAddress("");
    }
  };

  return (
    <div >
      <div className="depositcontainner">
        <div className="cldiv">
          <img src={clutchdenLogo} alt="logo" className="clutchdenLogo" />
        </div>
        <h2 className="dftx">Withdrawal Request</h2>
        
        <div className="outterformdiv">
          <form onSubmit={handleSubmit} className="formcontainer">
            {/* Amount */}
            <div>
              <label className="datx">Withdrawal Amount (USD)</label>
            </div>

            <div>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="inputboxcss"
              min={1}
            />
            </div>
 
            {/* Wallet Type */}
            <label className="datx" >Wallet Type</label>
            <div>
            <select
              value={walletType}
              onChange={(e) => setWalletType(e.target.value)}
              className="inputboxcss"
            >
              {walletTypes.map((wallet) => (
                <option key={wallet} value={wallet} style={styles.welletoptions}>
                  {wallet}
                </option>
              ))}
            </select>
            </div>
 
            {/* Wallet Address */}
            <div>
            <label className="datx" >Wallet Address</label>
            </div>
            <div>
            <input
              type="text"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              className="inputboxcss"
            />
            </div>
            
            <div className="btndiv">
            <button type="submit"  disabled={loading} className="register-btn">
              {loading ? "Submitting..." : "Submit Withdrawal"}
            </button>
            </div>
          </form>
        </div>  
      </div>

      {/* ERROR POPUP */}
      {showErrorPopup && (
        <div className="ep-overlay" onClick={handleClosePopup}>
          <div className="ep-modal" onClick={(e) => e.stopPropagation()}>
            <div className="ep-header">
              <h3>Error</h3>
              <button className="ep-close" onClick={handleClosePopup}>×</button>
            </div>

            {responseMsg && <p >{responseMsg}</p>}

            <div className="ep-actions">
              <button className="ep-btn" onClick={handleClosePopup}>OK</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default WithdrawalPage;


const styles = {
  welletoptions : {
    position: "fixed",
    inset: "0",
    top: "0",
    background: "white",
  }
};