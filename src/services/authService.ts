import { apiClient } from "../api/client";

export const getProfile = async () => {
  const token = localStorage.getItem("auth token");

  const response = await apiClient.get("/auth/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getAllArticle = async () => {
  console.log("getAllArticle function called");
  try {
    const response = await apiClient.get("/news/public/news", {});
    console.log("Full response from /news/public/news:", response); // This will now run only on success
    return response.data;
  } catch (error) {
    console.error("Error inside getAllArticle:", error); // Add this
    return null;
  }
};
export const getNewsByTag = async (tag: string) => {
  try {
    const response = await apiClient.get(`news/tags/${tag}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching news by tag:", error);
    return null;
  }
};
