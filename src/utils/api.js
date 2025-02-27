import axios from "axios";

const API_URL = "https://vendor-backend-production.up.railway.app";

export const registerVendor = async (vendorData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, vendorData);
    return response.data;
  } catch (error) {
    console.error("Registration Error:", error.response?.data || error);
    throw error;
  }
};
