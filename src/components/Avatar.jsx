// src/components/Avatar.jsx
import React, { useEffect, useState } from "react";
import api from "../api/api"; // import the default export `api`

const Avatar = ({ userId, size = 80, className = "" }) => {
  const [profilePicUrl, setProfilePicUrl] = useState(null);

  useEffect(() => {
    let isMounted = true; // avoid state updates after unmount

    const fetchProfilePic = async () => {
      try {
        let response;

        if (userId) {
          response = await api.getProfilePicture(userId);
        } else {
          response = await api.getAuthenticatedProfilePicture();
        }

        if (!isMounted) return;

        // Axios returns blob in response.data
        const blob = response.data;


        if (blob && blob.size > 0) {
          const url = URL.createObjectURL(blob);
          setProfilePicUrl(url);
        } else {
          setProfilePicUrl(null); // fallback will be used
        }
      } catch (err) {
        console.error("Failed to load profile picture:", err);
        setProfilePicUrl(null); // fallback on error
      }
    };

    fetchProfilePic();

    return () => {
      isMounted = false;
      // revoke blob URL to avoid memory leaks
      if (profilePicUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(profilePicUrl);
      }
    };
  }, [userId]);

  const fallbackAvatar = "https://via.placeholder.com/150?text=Avatar";

  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        overflow: "hidden",
        backgroundColor: "#eee",
      }}
    >
      <img
        src={profilePicUrl || fallbackAvatar}
        alt="User Avatar"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
  );
};

export default Avatar;
