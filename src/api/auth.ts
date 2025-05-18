import { apiClient } from "./client";

type SignupPayLoad = {
  fullname: string;
  email: string;
  password: string;
};
type BioPayLoad = {
  bio: string;
  portfolioURL: string;
  termsAgreed: boolean;
  newsletterUpdates: boolean;
};
type PreferencesPayload = {
  preferences: string[];
  experienceLevel: string;
};

type LoginPayload = {
  email: string;
  password: string;
};

// type NewsPayload = {
//     preferences: string[];
//     title: string;
//     coverImageUrl: string;
//     pdfFileUrl: string;
//   };
const auth_token = localStorage.getItem("auth token");

export const AuthApi = {
  //sending the data to backend
  async signup(data: SignupPayLoad) {
    try {
      const response = await apiClient.post("/auth/register/step1", data, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      // Handle error, could be a validation error or server error
      console.error("❌ Failed to store session data:", error);
      throw error; // You can throw or handle it as needed
    }
  },
  async bio(data: BioPayLoad) {
    try {
      const response = await apiClient.post("/auth/register/step2", data, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("❌ ~ bio ~ error:", error);
      throw error;
    }
  },
  async preferences(data: PreferencesPayload) {
    try {
      const response = await apiClient.post("/auth/register/step3", data, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("❌ ~ preferences ~ error:", error);
      throw error;
    }
  },
  async finalize() {
    try {
      const response = await apiClient.post(
        "/auth/register/finalize",
        {},
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error("❌ ~ finalize ~ error:", error);
      throw error;
    }
  },

  async getSessionData() {
    try {
      const response = await apiClient.get("/auth/session", {
        withCredentials: true, // necessary to fetch session-linked cookie
      });
      return response.data; // Should contain session info, e.g., user data
    } catch (error) {
      console.error("❌ Error retrieving session data:", error);
      throw error;
    }
  },

  async login(data: LoginPayload) {
    try {
      const response = await apiClient.post("/auth/login", data, {
        withCredentials: true,
      });
      // console.log(response.data); gives login scuessfull and token
      return response.data;
    } catch (error) {
      console.error("❌ ~ login ~ error:", error);
      throw error;
    }
  },

  async uploadNews(formData: FormData) {
    try {
      const response = await apiClient.post("/news", formData, {
        headers: {
          Authorization: `Bearer ${auth_token}`,
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("🚀 ~ uploadNews ~ error:", error);
      throw error;
    }
  },
  async updateAuthor(updatedData: {
    fullName: string;
    bio: string;
    preferences: string[];
  }) {
    try {
      const response = await apiClient.put("/auth/profile", updatedData, {
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("🚀 ~ updateAuthor ~ error:", error);
      throw error;
    }
  },
};
