// import i18n from '@/i18n'
export const validatePassword = () => {
  return (rule: any, value: any, callback: any) => {
    if (value.length < 6) {
      callback(new Error("密码不能小于6位"));
    } else {
      callback();
    }
  };
};
