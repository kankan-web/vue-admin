const useTable = () => {
  const columns=[
    {
      title: "姓名",
      dataKey: "name",
      key: "name",
      minWidth: 100,
      width: 100,
      
    },
    {
      title: "年龄",
      dataKey: "age",
      key: "age",
      minWidth: 100,
      width: 100,
    },
    {
      title: "性别",
      dataKey: "sex",
      key: "sex",
      minWidth: 100,
      width: 100,
    },
    {
      title: "地址",
      dataKey: "address",
      key: "address",
      minWidth: 100,
      width: 100,
    },
    {
      title: "邮箱",
      dataKey: "email",
      key: "email",
      minWidth: 100,
      width: 100,
    },
    {
      title: "电话",
      dataKey: "phone",
      key: "phone",
      minWidth: 100,
      width: 100,
    },
    
  ];
  return {
    columns
  }
};
export default useTable;
