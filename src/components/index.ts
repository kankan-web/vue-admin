import { App } from "vue";
import chooseArea from "./chooseArea";
import chooseIcon from "./chooseIcon";
import trend from "./trend";
import menu from './menu'
const components = [chooseArea, chooseIcon, trend,menu];
export default {
  install(app: App) {
    components.map((item) => {
      app.use(item);
    });
  },
};
