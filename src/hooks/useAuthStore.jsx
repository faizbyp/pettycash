import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create()(
  persist(
    (set, get) => ({
      username: "",
      name: "",
      email: "",
      id_user: "",
      id_role: "",
      access_token: "",

      setAuth: (loginRes) => {
        set({
          username: loginRes.username,
          name: loginRes.name,
          email: loginRes.email,
          id_user: loginRes.id_user,
          id_role: loginRes.id_role,
          access_token: loginRes.access_token,
        });
      },

      checkAuth: () => {
        const access_token = get().access_token;
        if (access_token) {
          set({
            access_token: access_token,
          });
        } else {
          window.location.replace("/login");
        }
      },

      setAccessToken: (newToken) => {
        set({ access_token: newToken });
      },

      signOut: () => {
        set({
          username: "",
          name: "",
          email: "",
          id_user: "",
          id_role: "",
          access_token: "",
        });
        localStorage.removeItem("auth-storage");
        window.location.replace("/login");
      },
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;
