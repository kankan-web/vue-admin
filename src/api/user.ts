// 获取用户部门列表
export const getUserDepartment = () => {
  return {
    code: 200,
    data: [
      {
        id: "1",
        name: "华东分部",
        children: [
          {
            id: "11",
            name: "研发部",
          },
          {
            id: "12",
            name: "市场部",
          },
          {
            id: "13",
            name: "商务部",
          },
          {
            id: "14",
            name: "财务部",
          },
        ],
      },
      {
        id: "2",
        name: "华南分部",
        children: [
          {
            id: "21",
            name: "研发部",
          },
          {
            id: "22",
            name: "市场部",
          },
          {
            id: "23",
            name: "商务部",
          },
          {
            id: "24",
            name: "财务部",
          },
        ],
      },
      {
        id: "3",
        name: "西北分部",
        children: [
          {
            id: "31",
            name: "研发部",
          },
          {
            id: "32",
            name: "市场部",
          },
          {
            id: "33",
            name: "商务部",
          },
          {
            id: "34",
            name: "财务部",
          },
        ],
      },
    ],
    msg: "成功",
  };
};
