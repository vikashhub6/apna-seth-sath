
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

export const chatService = {
  sendMessage: async (messages, token, fileUrl = null, fileType = null) => {
    const response = await fetch(`${BASE_URL}/aibot/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ messages, fileUrl, fileType }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Server error");
    }

    return response.json();
  },
};
