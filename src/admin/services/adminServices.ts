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
