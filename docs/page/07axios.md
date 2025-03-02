# axios二次封装

## 为什么要封装

如果不进行封装，每次定义请求时，都需要将超时时间设置、请求头设置、根据项目环境使用请求地址、错误处理等都需要设置一遍。

对 axios 进行封装，可以减少这些重复劳动。

## 封装需求

二次封装，我们一定要做好通用性以及扩展性，满足我们的开发需求，同时提供更多的功能，比如：

1.  统一配置：超时配置、请求头配置

-   baseURL：根据开发、测试、生产环境的不同，接口请求前缀需要加以区分

2.  请求拦截

-   添加身份验证信息（如 JWT Token）：从存储中获取 Token 并放入请求头中
-   显示 loading 动画（或进度条）
-   **取消请求：如果请求需求取消，则为其添加取消令牌**

3.  响应拦截

-   响应成功：若状态码为 401，则表示登录权限失效，需要重新登录
-   响应成功：隐藏 loading 动画（或进度条）
-   响应成功：检查返回的 code 字段，根据后端定义的返回代码处理不同等业务逻辑
    -   状态码为 200，但是返回的内容存在错误
-   响应失败：对请求超时和网络错误做单独的判断
-   响应失败：根据服务器响应的**状态码**做不同的处理和提示

4.  封装常用的 HTTP 方法：GET、POST、PUT、DELETE 等
4.  全局统一的 loading 配置
-   默认开启，可配置关闭
-   统一管理，业务中不用再去关心这个逻辑

## 封装思路

### 1. 统一配置

```js
// 默认配置
export const defaultConfig: TAxiosRequestConfig = {
	baseURL: import.meta.env.VITE_API_URL || '',
	timeout: 10000,
	headers: {
		Accept: 'application/json, text/plain, */*',
		'Content-Type': 'application/json',
		'X-Requested-With': 'XMLHttpRequest'
	},
	loading: true, // 显示加载中
	cancel: true // 取消重复请求
}
```

### 2. 请求拦截

-   执行请求前的自定义回调（如果有）
-   显示 loading 动画（或进度条）
-   **取消请求：如果请求需求取消，则为其添加取消令牌**
-   添加身份验证信息（如 JWT Token）：从存储中获取 Token 并放入请求头中

```js
TRequest.axiosInstance.interceptors.request.use(
  (config: TAxiosRequestConfig): Promise<any> => {
    //1. 针对单个请求的自定义回调
    if (typeof config.beforeRequestCallback === 'function') {
      config = config.beforeRequestCallback(config)
    }
    
    //2. 显示加载动画
    showLoading(config)

    //3. 添加取消请求
    if (config.cancel) {
      axioCanceler.addPending(config)
    }

    //4. 添加token到请求头
    addTokenToHeader(config)

    //5. 请求之前
    return Promise.resolve(config)
    },
  (error:TAxiosError) => {
    const config = error.config
		//6.隐藏loading
		hideLoading(config)
    return Promise.reject(error)
  }
)
```

添加 token 到请求头

```js
export function addTokenToHeader(config: TAxiosRequestConfig): void {
	const token = getToken()//从localStorage或pinia中获取token
	if (token) {
		config.headers = config.headers || {}
		config.headers['Authorization'] = `Bearer ${token}`
	}
}
```

### 3. 响应拦截

1.  响应拦截：

```js
this.instance.interceptors.response.use(
    (response: TAxiosResopnse) => {
        ...请求响应成功
    },
    async (error: AxiosError) => {
        ...请求响应失败
    }
)
```

2.  响应成功内部处理

-   执行响应前回调：如果配置了`beforeResponseCallback`回调函数，会在处理响应数据之前执行。
-   隐藏加载动画：无论请求成功还是失败，都会调用`hideLoading`来隐藏加载动画。
-   处理业务错误：通过`handleBusinessError`函数检查响应数据中是否包含业务错误，如果存在错误则返回`Promise.reject`。
-   移除取消请求标记：如果请求配置了`cancel`，则在请求完成后移除对应的`cancelToken`。
-   返回响应数据：如果一切正常，最终返回响应数据`response.data`。

```js
const { config, data } = response

// 1.执行响应前回调
if (typeof config.beforeResponseCallback === 'function') {
  config.beforeResponseCallback(config)
}

// 2.隐藏加载动画
hideLoading(config)

// 3.处理业务错误
if (handleBusinessError(data)) {
  return Promise.reject(data)
}

// 4.请求完成后，删除对应的cancelToken
if (config.cancel) {
  axioCanceler.removePending(config)
}

// 响应成功
return response.data
```

业务错误`handleBusinessError`：

```js
// 处理业务错误
export function handleBusinessError(data: any): boolean {
  // 如果没有code，说明不是标准响应格式（如二进制流）
  if (!data || !data.code) {
    return false
  }
  // 处理不同的业务状态码
  switch (data.code) {
    case ResultEnum.SUCCESS:
      return false
    case ResultEnum.OVERDUE:
      ElMessage.error(data.msg || '登录已过期，请重新登录')
      // 这里可以处理登出逻辑
      localStorage.removeItem('token')
      // router.push('/login')
      return true
    default:
      ElMessage.error(data.msg || '请求失败')
      return true
  }
}
```

3.  响应失败处理

-   隐藏加载动画：如果存在`config`，调用`hideLoading`隐藏加载动画。
-   移除取消请求标记：如果请求配置了`cancel`，则移除对应的`cancelToken`。
-   标记取消请求：通过`Axios.isCancel(error)`判断是否为取消请求，并将结果赋值给`error.isCancelRequest`。

-   处理网络错误：如果不是取消请求，调用`handleNetworkError`处理网络错误。
-   处理HTTP状态码错误：如果存在`error.response`，调用`checkStatus`处理HTTP状态码错误。
-   处理断网情况：如果检测到断网，输出提示信息。

```js
// 响应错误
const config = error.config

// 隐藏加载动画
if (config) {
  hideLoading(config)
}

// 请求出错时，也需要删除对应的cancelToken
if (error.config && error.config.cancel) {
  axioCanceler.removePending(error.config)
}

// 标记取消请求
error.isCancelRequest = Axios.isCancel(error)

// 处理网络错误
if (!error.isCancelRequest) {
  handleNetworkError(error)
}

// 处理HTTP状态码错误
if (error.response) {
  checkStatus(error.response.status)
}

// 处理断网情况
if (!window.navigator.onLine) {
  console.log('网络已断开，请检查网络连接')
  // router.replace('/500')
}

return Promise.reject(error)
```

处理网络错误`handleNetworkError`：

```js
// 处理错误信息
export function handleNetworkError(error: TAxiosError): void {
	let message = '未知错误'
	if (error.message) {
		if (error.message.includes('timeout')) {
			message = '网络请求超时'
		} else if (error.message.includes('Network Error')) {
			message = '网络连接错误'
		} else {
			message = error.message
		}
	}
	ElMessage.error(message)
}
```

处理HTTP状态码错误`checkStatus`：

```js
// 处理HTTP状态码
export function checkStatus(status: number): void {
	switch (status) {
		case 400:
			ElMessage.error('请求错误(400)')
			break
		case 401:
			ElMessage.error('未授权，请重新登录(401)')
			// 这里可以处理登出逻辑
			break
		case 403:
			ElMessage.error('拒绝访问(403)')
			break
		case 404:
			ElMessage.error('请求出错(404)')
			break
		case 408:
			ElMessage.error('请求超时(408)')
			break
		case 500:
			ElMessage.error('服务器错误(500)')
			break
		case 501:
			ElMessage.error('服务未实现(501)')
			break
		case 502:
			ElMessage.error('网络错误(502)')
			break
		case 503:
			ElMessage.error('服务不可用(503)')
			break
		case 504:
			ElMessage.error('网络超时(504)')
			break
		case 505:
			ElMessage.error('HTTP版本不受支持(505)')
			break
		default:
			ElMessage.error(`连接出错(${status})!`)
	}
}
```

### 4. 封装请求方法

```js
/**常用方法封装 */
public post<T, P>(url: string, params?: AxiosRequestConfig<P>, config?: TAxiosRequestConfig): Promise<T> {
  return TRequest.axiosInstance.post(url, params, config)
}

public get<T, P>(url: string, params?: AxiosRequestConfig<P>, config?: TAxiosRequestConfig): Promise<T> {
  return TRequest.axiosInstance.get(url, { params, ...config })
}

public put<T, P>(url: string, params?: AxiosRequestConfig<P>, config?: TAxiosRequestConfig): Promise<T> {
  return TRequest.axiosInstance.put(url, params, config)
}

public delete<T, P>(url: string, params?: AxiosRequestConfig<P>, config?: TAxiosRequestConfig): Promise<T> {
  return TRequest.axiosInstance.delete(url, { params, ...config })
}
```

### 5. 实际使用

1.  简单请求

```js
const res = await http.get('/api/users')
const res = await http.post('/api/users', { name: 'John' })
const res = await http.put('/api/users', { name: 'John' })
const res = await http.delete('/api/users', { name: 'John' })
const res = await http.download('/api/users', { name: 'John' })
const res = await http.upload('/api/users', { name: 'John' })
const blob = await http.download<Blob, API.ReportParams>('/api/reports/download', params)

const formData = new FormData()
formData.append('file', file)
formData.append('fileName', file.name)
const res = await http.upload<API.UploadResponse>('/api/upload', formData)
```

2.  自定义配置

```js
const res = await http.get<API.DataResponse, null>('/api/data', null, {
  // 不显示加载动画
  loading: false,
  // 不取消重复请求
  cancel: false,
  // 自定义超时时间
  timeout: 5000,
  // 自定义请求头
  headers: {
    'Custom-Header': 'value'
  }
})
```

3.  取消请求

```js
// 在组件中使用取消请求
import { onMounted, onUnmounted } from 'vue'
import { http } from '@/utils/http'

export default {
  setup() {
    // 组件挂载时发起请求
    onMounted(() => {
      fetchData()
    })

    // 组件卸载时取消所有请求
    onUnmounted(() => {
      http.cancelAllRequests()
    })

    // 取消特定请求
    const cancelSearch = () => {
      http.cancelRequest('/api/search')
    }

    // 发起请求
    const fetchData = async () => {
      try {
        const res = await http.get('/api/data')
        // 处理数据
      } catch (error) {
        // 如果是取消请求导致的错误，不做处理
        if (error.isCancelRequest) return
        // 处理其他错误
      }
    }

    return {
      cancelSearch
    }
  }
}
```

## 请求取消

为了确保前端请求的时机合适、避免无效请求，或者处理接口返回的数据顺序问题，可以采取一些常见的策略：

### 1. 防抖

介绍：当事件触发频率较高时，防抖机制会延迟请求的发送，只有在一段时间内没有新的操作时才会发出请求。

适用场景

-   **输入框实时搜索：** 用户输入关键词时不需要每次输入都发送请求，而是等待用户输入完毕，减少请求的数量。
-   **按钮点击：** 确保短时间内用户多次点击按钮时只发起最后一次请求。

### 2. 锁状态（Throttle）

介绍：锁状态是限制操作的频率，确保同一时间只能有一个请求正在进行。

不同于防抖，它保证每隔一定时间才会执行一次请求。

### 3. 取消请求

取消请求可以用来**避免处理不再需要的请求**，这对防止无用请求和处理接口响应顺序问题尤为重要。如果用户快速切换操作或路由，前一个请求可能不再有意义，取消它能够节省资源并避免无效的渲染。

**原理：** AbortController 是一个用于管理请求取消的接口，它提供了一种优雅的方式来中止进行中的网络请求。使用方法简洁明了：

1.  通过 `new AbortController()` 创建控制器实例
1.  使用 `controller.signal` 获取关联的信号对象
1.  将该信号作为选项传入 fetch 请求：`fetch(url, { signal })`
1.  需要取消时，只需调用 `controller.abort()`

```js
const controller = new AbortController();

axios.get('/foo/bar', {
   signal: controller.signal
}).then(function(response) {
   //...
});
// 取消请求
controller.abort()
```

**适用场景：**

-   **频繁的Tab切换、树节点切换：** 用户在切换不同模块时，可能会发出多个请求，这时候只需要保留最后一次请求的数据。
-   **路由切换时的请求：** 用户切换页面时，当前页面的请求可能不再需要，因此需要取消当前请求。

**核心思想：**

1.  **唯一标识请求**  
    通过 `URL + 方法 + 序列化参数` 生成唯一 Key，识别重复请求。
1.  **自动取消重复请求**  
    当检测到相同请求正在执行时，自动取消旧请求，保留最新请求。
1.  **集中管理所有请求**  
    使用 `Map` 存储所有 pending 状态的请求控制器，支持批量操作。

**完整代码：**

```js
import { TAxiosRequestConfig } from './type'
import qs from 'qs'

const pendingMap = new Map<string, AbortController>()

//序列化参数，确保对象属性顺序一致
const sortedStringify = (obj: unknown) => {
	if (!obj) return ''
	return qs.stringify(obj, {
		arrayFormat: 'repeat',
		sort: (a, b) => a.localeCompare(b)
	})
}

//获取请求的唯一标识
export const getPendingUrl = (config: TAxiosRequestConfig) => {
	const { url, method, params, data } = config
	return [url, method, sortedStringify(params), sortedStringify(data)].join('&')
}

export class AxiosCanceler {
	//添加请求
	addPending(config: TAxiosRequestConfig) {
		this.removePending(config)// 先取消旧请求
		const url = getPendingUrl(config)
		const controller = new AbortController()
		config.signal = controller.signal// 绑定取消信号
		pendingMap.set(url, controller)// 存储控制器
	}

	//移除请求
	removePending(config: TAxiosRequestConfig) {
		const url = getPendingUrl(config)
		if (pendingMap.has(url)) {
			const controller = pendingMap.get(url)
			if (controller) {
				controller.abort()// 终止请求
				pendingMap.delete(url)// 清理记录
			}
		}
	}

	//移除所有请求
	removeAllPending() {
		pendingMap.forEach(controller => {
			controller.abort()
		})
		pendingMap.clear()
	}

	//根据URL移除请求
	removeByUrl(url: string) {
		pendingMap.forEach((controller, pendingUrl) => {
			if (pendingUrl.includes(url)) {
				controller.abort()
				pendingMap.delete(pendingUrl)
			}
		})
	}
}
```

## 参考

1.  [打造企业级axios二次封装，领导连忙点赞](https://juejin.cn/post/7462278105698222115)
1.  [前端架构带你 封装axios，一次封装终身受益「美团后端连连点赞」](https://juejin.cn/post/7124573626161954823?searchId=202403281034427A3D0E90E29782DFE3E1)
1.  [如何优雅地封装 axios | Jack Chou’s blog](https://jackchoumine.github.io/web/js/%E5%B0%81%E8%A3%85axios.html#%E6%80%BB%E7%BB%93)
1.  [smart-admin/smart-admin-web-javascript/src/lib/axios.js at master · 1024-lab/smart-admin](https://github.com/1024-lab/smart-admin/blob/master/smart-admin-web-javascript/src/lib/axios.js)
1.  [Geeker-Admin/src/api/index.ts at master · HalseySpicy/Geeker-Admin](https://github.com/HalseySpicy/Geeker-Admin/blob/master/src/api/index.ts)
1.  [axios请求取消、请求竞态、请求重试](https://juejin.cn/post/7346510261074133027)