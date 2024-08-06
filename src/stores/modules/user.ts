import { defineStore } from "pinia";
import piniaPersistConfig from "@/stores/helper/persist";
export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    token: "",
    userInfo: { name: "Kankan" },
  }),
  getters: {},
  actions: {
    //set token
    setToken(token: string) {
      this.token = token;
    },
    //set userInfo
    setUserInfo(userInfo) {
      this.userInfo = userInfo;
    },
  },
  persist: piniaPersistConfig("user"),
});
