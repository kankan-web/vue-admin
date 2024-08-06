import { PersistedStateOptions } from "pinia-plugin-persistedstate";
/**
 * @description pinia 持久化参数配置
 * @param {String} key 存储到持久化的name
 * @param {Array} paths 需要存储的属性名
 * @return persist
 */
const piniaPersistConfig = (key: string, paths?: Array<string>) => {
  const persist: PersistedStateOptions = {
    key,
    // storage: localStorage,
    storage: sessionStorage,
    paths,
  };
  return persist;
};
export default piniaPersistConfig;
