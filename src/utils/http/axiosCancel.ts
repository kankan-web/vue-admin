import {TAxiosRequestConfig} from './type'
import qs from 'qs'

const pendingMap = new Map<string,AbortController>();

//序列化参数，确保对象属性顺序一致
const sortedStringify=(obj:any)=>{
  return qs.stringify(obj, {
    arrayFormat: 'repeat',
    sort: (a, b) => a.localeCompare(b),
  })
}

//获取请求的唯一标识
export const getPendingUrl=(config:TAxiosRequestConfig)=>{
  const {url,method,params,data}=config
  return [url,method,sortedStringify(params),sortedStringify(data)].join('&')
}

export class AxiosCanceler{
  //添加请求
  addPending(config:TAxiosRequestConfig){
    this.removePending(config)
    const url=getPendingUrl(config)
    const controller=new AbortController()
    config.signal =controller.signal
    pendingMap.set(url,controller)
  }

  //移除请求
  removePending(config:TAxiosRequestConfig){
    const url=getPendingUrl(config)
    if(pendingMap.has(url)){
      const controller=pendingMap.get(url)
      if(controller){
        controller.abort()
        pendingMap.delete(url)
      }
    }
  }
  //移除所有请求
  removeAllPending(){
    pendingMap.forEach((controller)=>{
      controller.abort()
    })
    pendingMap.clear()
  }
}

  