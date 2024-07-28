import { defineComponent, PropType, useAttrs } from "vue";
import { MenuItem } from "./type";
export default defineComponent({
  props: {
    // 导航菜单的数据
    data: {
      type: Array as PropType<MenuItem[]>,
      required: true,
    },
    defaultActive: {
      type: String,
      default: "",
    },
    //是否是路由模式
    router: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    //#TODO：封装一个渲染无限层级菜单的方法
    //函数会返回一段jsx的代码
    let renderMenu = (data: MenuItem[]) => {
      return data.map((item: MenuItem) => {
        //每个菜单的图标
        // item.i = ;
        //处理插槽
        let slots = {
          title: () => {
            return (
              <>
                <el-icon>
                  <component is={item.icon}></component>
                </el-icon>
                <span>{item.name}</span>
              </>
            );
          },
        };
        //递归渲染子菜单
        if (item.children && item.children.length) {
          return (
            <el-sub-menu index={item.index} v-slots={slots}>
              {renderMenu(item.children)}
            </el-sub-menu>
          );
        }
        //正常处理普通菜单
        return (
          <el-menu-item index={item.index}>
            <el-icon>
              <component is={item.icon}></component>
            </el-icon>
            <span>{item.name}</span>
          </el-menu-item>
        );
      });
    };
    const Attr = useAttrs();
    return () => {
      return (
        <el-menu
          default-active={props.defaultActive}
          router={props.router}
          {...Attr}
        >
          {renderMenu(props.data)}
        </el-menu>
      );
    };
  },
});
