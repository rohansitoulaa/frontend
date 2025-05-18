import { admin } from "../api/admin";

export const getPendingArticles = async () => {
  const token = localStorage.getItem("auth token");

  const response = await admin.get("/admin/pending-news", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
export const approveArticle = async (newsId: string) => {
  const token = localStorage.getItem("auth token");

  const response = await admin.put(
    `/admin/approve/${newsId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const rejectArticle = async (newsId: string) => {
  const token = localStorage.getItem("auth token");

  const response = await admin.put(
    `/admin/reject/${newsId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getPendingAuthors = async () => {
  const token = localStorage.getItem("auth token");

  const response = await admin.get("/admin/authors/unverified", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const approveAuthor = async (userId: string) => {
  const token = localStorage.getItem("auth token");

  const response = await admin.put(
    `/admin/authors/approve/${userId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const authorsNews = async (userId: string) => {
  const response = await admin.get(`/admin/authors/${userId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("auth token")}`,
    },
  });
  return response.data;
};

export const verifiedAuthors = async () => {
  const response = await admin.get(`admin/authors/verified`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("auth token")}`,
    },
  });
  return response.data;
};
export const deleteAuthor = async (userId: string) => {
  const response = await admin.delete(`admin/author/${userId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("auth token")}`,
    },
  });
  return response.data;
};

export const deleteNews = async (newsId: string) => {
  const response = await admin.delete(`admin/news/${newsId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("auth token")}`,
    },
  });
  return response.data;
};
export const getAllArticle = async () => {
  console.log("getAllArticle function called");
  try {
    const response = await admin.get("/news/public/news", {});
    console.log("Full response from /news/public/news:", response); // This will now run only on success
    return response.data;
  } catch (error) {
    console.error("Error inside getAllArticle:", error); // Add this
    return null;
  }
};
export const getNewsByAuthor = async (userId: string) => {
  try {
    const response = await admin.get(`news/author/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching news by author:", error);
    return null;
  }
};

export const topAuthors = async () => {
  const response = await admin.get(`news/top-authors`, {});
  return response.data;
};

export const topCategories = async () => {
  const response = await admin.get(`news/top-categories`, {});
  return response.data;
};
