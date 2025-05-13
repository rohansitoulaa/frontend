// type SignupPayLoad = {
//   fullname: string;
//   email: string;
//   password: string;
// };

// export const AuthApi = {
//   //sending the data to backend
//   async signup(data: SignupPayLoad) {
//     try {
//       const response = await apiClient.post("/admin", data, {
//         withCredentials: true,
//       });
//       return response.data;
//     } catch (error) {
//       // Handle error, could be a validation error or server error
//       console.error("❌ Failed to store session data:", error);
//       throw error; // You can throw or handle it as needed
//     }
//   },
// };
