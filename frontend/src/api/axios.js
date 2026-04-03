import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         console.log("Refreshing token...");

//        const resposne= await api.get("/api/refresh-token");
//         console.log(resposne);
        
//         return api(originalRequest);

//       } catch (err) {
//         console.log("Session expired");
//         // window.location.href = '/login';
//       }
//       }

//     return Promise.reject(error);
//   }
// );

export default api;
