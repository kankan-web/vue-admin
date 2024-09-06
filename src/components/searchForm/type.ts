import { Responsive } from "../Gird/type";
export type SearchProps = {
  type: string;//当前搜索框的类型
  label: string;//当前搜索框的label
  prop?: any;//属性值名称
  slotName?:string;//插槽名称
  labelConfig?:{//设置label的属性
    [key:string]:any
  }
  options?:{
    label:string;
    value:any;
  }[]
  layout?:{//设置布局的属性
    span?:number;
    offset?:number;
    xs?:Responsive ;
    sm?:Responsive;
    md?:Responsive;
    lg?:Responsive;
    xl?:Responsive;
  }
  config?:{//搜索框项参数，根据element-plus官方文档来传递，该属性所有值会透传到组件
    [key:string]:any
  }
};
