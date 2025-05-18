import { apiClient } from "../api/client";
import { useAuthStore } from "../stores/authStore";

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

export const getNewsByAuthor = async () => {
  const user = useAuthStore.getState().user;

  if (!user || !user.UserId) {
    console.error("User not found or UserId is missing");
    return null;
  }

  try {
    const response = await apiClient.get(`news/author/${user.UserId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching news by author:", error);
    return null;
  }
};

export const deleteNewsById = async (newsId: string) => {
  const token = localStorage.getItem("auth token");

  // const user = useAuthStore.getState().user;

  // if (!user || !user.UserId) {
  //   console.error("User not found or UserId is missing");
  //   return null;
  // }

  try {
    console.log("Deleting:", `news/delete/${newsId}`);
    const response = await apiClient.delete(`/news/delete/${newsId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching news by author:", error);
    return null;
  }
};

export const deleteAuthor = async (password: string) => {
  const token = localStorage.getItem("auth token");

  if (!token) {
    console.error("Auth token is missing");
    return null;
  }

  try {
    console.log("Deleting account with password...");

    const response = await apiClient.delete(`/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        password: password,
      },
    });

    return response.data;
  } catch (error) {
    console.error("❌ Error deleting account:", error);
    return null;
  }
};

export const getDraftArticles = async () => {
  const token = localStorage.getItem("auth token");

  if (!token) {
    console.error("Missing auth token");
    return null;
  }

  try {
    const response = await apiClient.get("news/drafts", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching drafts:", error);
    return null;
  }
};
