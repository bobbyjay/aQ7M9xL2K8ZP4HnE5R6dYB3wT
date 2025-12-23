// src/pages/Settings.jsx
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import addImage from "../assets/addimage.svg"

export default function Settings() {
  const { user, updateProfile, logout } = useAuth();

  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");

  // ----------------------------
  // HANDLE IMAGE SELECTION
  // ----------------------------
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);

    if (file) setPreview(URL.createObjectURL(file));
    else setPreview(null);
  };

  // ----------------------------
  // UPLOAD PROFILE PICTURE
  // ----------------------------
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedImage) return setResponseMsg("Please select an image first");

    setLoading(true);
    setResponseMsg("");

    const result = await updateProfile({}, selectedImage); // AuthContext handles upload
    if (result.success) {
      setResponseMsg("Profile updated successfully ✔");
      setPreview(null);
      setSelectedImage(null);
    } else {
      setResponseMsg(result.message || "Upload failed ❌");
    }

    setLoading(false);
  };

  // ----------------------------
  // LOGOUT
  // ----------------------------
  const handleLogout = () => {
    logout();
  };

  return (
    <div style={styles.container}>
      <h1>Settings</h1>

      <div style={styles.card}>
        <h2 style={styles.pptx}>Profile Picture</h2>

        {/* Preview */}
        {preview ? (
          <img src={preview} alt="Preview" style={styles.preview} />
        ) : user?.profilePictureUrl ? (
          <img src={user.profilePictureUrl} alt="Profile" style={styles.preview} />
        ) : (
          <img src={addImage} alt="add image" style={styles.pputx}/>
        )}

        {/* File Input */}
        <input type="file" accept="image/*" onChange={handleImageChange} style={styles.pputx}/>

        {/* Upload Button */}
        <button style={styles.button} onClick={handleUpload} disabled={loading}>
          {loading ? "Uploading..." : "Upload New Picture"}
        </button>

        {/* Response Message */}
        {responseMsg && <p style={styles.message}>{responseMsg}</p>}
      </div>

      {/* Logout Section */}
      <div style={styles.card}>
        <h2>Account</h2>
        <button style={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

// ----------------------------
// STYLES
// ----------------------------
const styles = {
  container: {
    maxWidth: "600px",
    margin: "30px auto",
    padding: "10px",
  },
  card: {
    background: "#ffffff",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "25px",
    boxShadow: "0 0 10px rgba(0,0,0,0.06)",
  },
  pputx:{
    color:"#2b2a2aff",
  },
  pptx:{
    color: "black",
  },
  preview: {
    width: "150px",
    height: "150px",
    borderRadius: "10px",
    objectFit: "cover",
    marginBottom: "15px",
    border: "1px solid #ddd",
  },
  button: {
    padding: "12px 18px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "10px",
  },
  logoutButton: {
    padding: "12px 18px",
    background: "red",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  message: {
    marginTop: "12px",
    fontWeight: "bold",
  },
};
