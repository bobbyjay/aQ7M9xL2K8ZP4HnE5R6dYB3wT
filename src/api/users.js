// src/api/users.js
import axiosClient from "axios";  // <-- REQUIRED IMPORT

export const me = () => axiosClient.get('/users/me'); 

export const updateProfile = (data) =>
  axiosClient.put('/users/update-profile', data);

export const updatePassword = (data) =>
  axiosClient.put('/users/update-password', data);

export const deleteAccount = (data) =>
  axiosClient.delete('/users/delete-account', { data });
