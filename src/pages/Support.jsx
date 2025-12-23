// src/pages/SupportPage.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/ErrorPopup.css";
import "../styles/supportChart.css";
import addIcon from "../assets/deposit.svg";
import cancelIcon from "../assets/cancel.svg";
import attachFileIcon from "../assets/attachFile.svg";
import sendIcon from "../assets/send.svg";

export default function SupportPage() {
  const { createTicket, getTickets, getTicketThread, replyToTicket } = useAuth();

  // Form states for creating ticket
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // Tickets & selected thread
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null); // ticket object
  const [threadMessages, setThreadMessages] = useState([]);

  // Reply form state
  const [replyText, setReplyText] = useState("");
  const [replyImage, setReplyImage] = useState(null);
  const [replyPreview, setReplyPreview] = useState(null);

  const [responseMsg, setResponseMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  // Buttons
  const [showCreateNewPopup, setShowCreateNewPopup] = useState(false);
  
    
  /* ---------------------
     handleClosePopup
  ------------------------ */
  const handleClosePopup = () => {
    setShowErrorPopup(false);
    setResponseMsg("");
  };

  /* ----------------------
     Image handlers
  ---------------------- */
  const handleImageChange = (e) => {
    const file = e.target.files?.[0] ?? null;
    setImage(file);
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleReplyImage = (e) => {
    const file = e.target.files?.[0] ?? null;
    setReplyImage(file);
    setReplyPreview(file ? URL.createObjectURL(file) : null);
    setResponseMsg("");
  };

  /* ----------------------
     Create new ticket (uses createTicket from AuthContext)
  ---------------------- */
  const submitNewTicket = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!subject.trim() || !message.trim()) {
      setResponseMsg("All fields are required.");
      setShowErrorPopup(true);
      return;
    }

    setLoading(true);
    setResponseMsg("");
    setShowErrorPopup(false);

    const formData = new FormData();
    formData.append("subject", subject.trim());
    formData.append("message", message.trim());
 
    if (image) {
      formData.append("image", image);
    }
 
    try {
      const res = await createTicket(formData);
  
      if (res?.success) {
        // ✅ Success state
        setResponseMsg("Support ticket created successfully.");
        setShowErrorPopup(true);
 
        // Reset form
        setSubject("");
        setMessage("");
        setImage(null);
        setPreview(null);
  
        // Refresh tickets list
        await loadTickets();
  
        // ✅ CLOSE POPUP AFTER SUCCESS
        handleCloseCreateNewMessagePopup();
      } else {
        setResponseMsg(res?.message || "An error occurred while sending the message.");
        setShowErrorPopup(true);
      }
    } catch (err) {
      setResponseMsg("Failed to create support ticket.");
      setShowErrorPopup(true);
    } finally {
      setLoading(false);
    }
  };


  /* ----------------------
     Load all tickets (uses getTickets from AuthContext)
     Defensive: accept res.data being array OR { tickets: [] }.
  ---------------------- */
  const loadTickets = async () => {
    try {
      const res = await getTickets();

      if (res?.success) {
        // support for both shapes:
        // res.data may be an array OR { tickets: [...] } OR { data: [...] }
        let list = [];
        if (Array.isArray(res.data)) list = res.data;
        else if (Array.isArray(res.data?.tickets)) list = res.data.tickets;
        else if (Array.isArray(res.data?.data)) list = res.data.data;
        setTickets(list);
      } else {
        setTickets([]);
      }
    } catch (err) {
      console.error("loading message error:", err);
      setResponseMsg("an error occurred.");
      setTickets([]);
    }
  };

  /* ----------------------
     Load thread for a ticket (uses getTicketThread)
     Defensive: res.data.ticket or res.data
  ---------------------- */
  const loadThread = async (ticketId) => {
    if (!ticketId) return;

    try {
      const res = await getTicketThread(ticketId);

      if (res?.success) {
        // backend might return { ticket: {...} } OR { data: ticket }
        const ticketObj = res.data?.ticket ?? res.data ?? res.data?.data ?? null;

        if (ticketObj) {
          setSelectedTicket(ticketObj);
          setThreadMessages(Array.isArray(ticketObj.messages) ? ticketObj.messages : []);
        } else {
          // fallback: set empty
          setSelectedTicket(null);
          setThreadMessages([]);
        }
      }
    } catch (err) {
      console.error("loadThread error:", err);
      setResponseMsg("an error occurred.");
    }
  };

  /* ----------------------
     Send reply (uses replyToTicket)
     After sending: prefer to use returned ticket (if provided), 
     otherwise re-fetch thread.
  ---------------------- */
  const sendReply = async (e) => {
    e.preventDefault();
    if (!selectedTicket) {
      setResponseMsg("Select a ticket first.");
      setShowErrorPopup(true);
      return;
    }
    if (!replyText.trim() && !replyImage) {
      setResponseMsg("Message or image required.");
      setShowErrorPopup(true);
      return;
    }

    const formData = new FormData();
    if (replyText.trim()) formData.append("message", replyText.trim());
    if (replyImage) formData.append("image", replyImage);

    try {
      console.log("📤 Sending reply...");
      const res = await replyToTicket(selectedTicket._id, formData);

      if (res?.success) {
        // if your AuthContext returns the updated ticket in res.data or res.data.data
        const returnedTicket = res.data?.ticket ?? res.data ?? res.data?.data ?? null;
        if (returnedTicket) {
          setSelectedTicket(returnedTicket);
          setThreadMessages(Array.isArray(returnedTicket.messages) ? returnedTicket.messages : []);
        } else {
          // otherwise re-fetch thread
          await loadThread(selectedTicket._id);
        }

        // clear reply inputs
        setReplyText("");
        setReplyImage(null);
        setReplyPreview(null);
        setResponseMsg("");
      } else {
        setResponseMsg(res?.message || "Reply failed.");
        setShowErrorPopup(true);
      }
    } catch (err) {
      console.error("sendReply error:", err);
      setResponseMsg("Network error.");
      setShowErrorPopup(true);
    }
  };

  /* ----------------------
     Initial tickets load
  ---------------------- */
  useEffect(() => {
    loadTickets();
  }, []);

  /* ----------------------
     Auto-refresh current thread every 5s (only when selected)
  ---------------------- */
  useEffect(() => {
    if (!selectedTicket?._id) return;

    const interval = setInterval(() => {
      loadThread(selectedTicket._id);
    }, 5000);

    return () => clearInterval(interval);
  }, [selectedTicket]);

  /* ---- BUTTONS ---- */
  const handleCloseCreateNewMessagePopup = () => {
    setShowCreateNewPopup(false);
  };
  const handleOpenCreateNewMessagePopup = () => {
    setShowCreateNewPopup(true);
  };


  /* ----------------------
     UI
  ---------------------- */

return (
  <div className="the-support-page"> 
    {/* HEADER */}
    <header className="heading-containner-for-support-chart">
      <h1 className="support-txt">Support Center</h1>
    </header>

    <main className="msg-containner-divider">
      {/* LEFT SIDE: Add New Message + Ticket List */}
      <section className="the-add-msg-section">
        {/* Add New Message */}
        <div className="add-n-msg-div">
          <div className="add-cover" onClick={handleOpenCreateNewMessagePopup}>
            <h4 className="add-n-msg-txt">Add new massage</h4>
            <div className="add-n-icon-div">
              <img src={addIcon} alt="add new massage" className="add-n-icon" />
            </div>
          </div>
        </div>
        
        {/* Ticket List */}
        <div className="msg-list">
          <div className="msg-txt-1">
            <h2 >Messages</h2>
          </div>
          {tickets.length === 0 && <div className="n-msg-wfpanmg-div"><p className="n-msg-wfpanmg">No massage was found Please Add new message.</p></div>}

          <div className="msg-width-stopper">
            {tickets.map((t) => (
              <div
                key={t._id}
                className="msg-item"
                onClick={() => loadThread(t._id)}
              >
                <label
                htmlFor="pickaMsg"
                >
                  <div
                    key={t._id}
                    className="section1-msg-option"
                  >
                    <strong>{t.subject}</strong>
                    <br />
                    <span>Status: {t.status}</span>
                    <br />
                    <small>{new Date(t.createdAt).toLocaleString()}</small>
                  </div>
                </label>
              </div>
            ))}
          </div>
        </div>
      </section> 

      {/* RIGHT SIDE: Thread View + Reply + Error Popup */}
      <section className="the-msg-thread-section">  
        {/* Thread View */}
        <div>
          <input type="checkbox" name="pickaMsg" id="pickaMsg" />
          <div className="the-msg-thread-section-en-div">
            <label htmlFor="pickaMsg" className="canceldiv1">
              <img src={cancelIcon} alt="cancel" className="cancelbtn"/>
            </label>
            {selectedTicket ? (
              <>
                <div className="msg-chart-containner-div">
                <h2 className="subjectname">Subject: {selectedTicket.subject}</h2>

                <div className="msg-chart-containner">
                  <h2 className="subjectname1">Subject: {selectedTicket.subject}</h2>
                  {threadMessages.length === 0 && <p>No messages yet.</p>}

                  {threadMessages.map((msg) => (
                    <div
                      key={msg._id}
                      className={`msgBubblediv ${msg.senderRole === "admin" ? "adminBubblediv" : "userBubblediv"}`}
                    >
                      <div></div>
                      <div
                        key={msg._id}
                        className={`msgBubble ${msg.senderRole === "admin" ? "adminBubble" : "userBubble"}`}
                      >
                        <p>
                          <strong>{msg.senderRole?.toUpperCase() ?? "USER"}</strong>
                        </p>
                        <div className="the-msg-txt-sent-div"><p className="the-msg-txt-sent">{msg.message}</p></div>
 
                        {msg.imageUrl && (
                          <img src={msg.imageUrl} alt="attachment" className="msgImage" />
                        )}

                        <small className="msg-date">{new Date(msg.sentAt).toLocaleString()}</small>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Reply Box */}
                <div className="the-send-form-system">
                <form onSubmit={sendReply} className="msg-form-sender">
                  <div className="msg-containner-div">
                    <textarea
                      placeholder="Message..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="the-txt-input"
                      maxLength={90}
                    />
                    
                    <div className="attachfile-icon-div">
                      <label htmlFor="attachfile" className="attachfile-icon-label"><img src={attachFileIcon} alt="attachfile" className="attachfile-icon"/></label>
                    </div>
                    <div>
                      <input type="file" accept="image/*" onChange={handleReplyImage} id="attachfile"/>
                      {replyPreview && <img src={replyPreview} alt="preview" className="replyPreview" />}
                    </div>
 
                    <button className="send-msg-btn"><img src={sendIcon} alt="send" className="attachfile-icon"/></button>
                  </div>
                </form>
                </div>
              </div>
              </>
            ) : (
              <p className="msg-ask">Select a message to view chat thread.</p>
            )}
          </div>
        </div>

        {/* ERROR POPUP */}
        {showErrorPopup && (
          <div className="ep-overlay" onClick={handleClosePopup}>
            <div className="ep-modal" onClick={(e) => e.stopPropagation()}>
              <div className="ep-header">
                <button className="ep-close" onClick={handleClosePopup}>×</button>
              </div>

              <p className="errormsg-sending">{responseMsg}</p>

              <div className="ep-actions">
                <button className="ep-btn" onClick={handleClosePopup}>OK</button>
              </div>
            </div>
          </div>
        )}

        {/* CREATE TICKET POPUP */}
        {showCreateNewPopup && (
          <div className="ep-overlay" onClick={handleClosePopup}>
            <div className="ep-modal" onClick={(e) => e.stopPropagation()}>

              <div className="createnewsupportmsg">
                <div>

                  <div className="notifyscroll">
                    <div>
                      <h2 className="csmsg-txt">Create Support Ticket</h2>

                      <form onSubmit={submitNewTicket} className="createnewmsgform">
                        <input
                          type="text"
                          placeholder="Subject"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          className="new-chart-txt"
                        />
  
                        <textarea
                          placeholder="Describe your issue..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className="new-chart-txt"
                        />
  
                        <input type="file" accept="image/*" onChange={handleImageChange} />
                        {preview && <img src={preview} alt="preview" className="ticketPreview" />}
   
                        <div className="submitmsgcreatbtn-div" >
                          <button 
                            type="submit"
                            disabled={loading} 
                            className="submit-new-chart-btn" 
                          >
                            {loading ? "Submitting..." : "Create Chart"}
                          </button>
                        </div>
                      </form>
  
                      <div className="popuperrormsg">{responseMsg && <p>{responseMsg}</p>}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="ep-actions">
                <button className="ep-btn" onClick={handleCloseCreateNewMessagePopup}>OK</button>
              </div>
            </div>
          </div>
        )}
        
      </section>
    </main>
  </div>
);

}