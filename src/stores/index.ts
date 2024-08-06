import { createPinia } from "pinia";
//https:github.com/prazdevs/pinia-plugin-persistedstate
import piniaPersistConfig from "pinia-plugin-persistedstate";
const pinia = createPinia();
pinia.use(piniaPersistConfig);
export default pinia;
