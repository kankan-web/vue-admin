//mockjs
//vite-plugin-mock
// let Mock = require("mockjs");
export default [
	{
		url: '/user_api/v1/user/profile_id', // 匹配的请求 URL 和真实请求的URL完全一致
		method: 'get', // 请求方法
		response: () => {
			// 返回的模拟数据
			return {
				code: 0,
				msg: 'success',
				data: {
					profile_id: '12345678'
				}
			}
		}
	}
]
