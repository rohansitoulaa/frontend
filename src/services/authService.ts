import {apiClient} from "../api/client";


export const getProfile = async () => {
  const token = localStorage.getItem("auth token");

  const response = await apiClient.get("/auth/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
