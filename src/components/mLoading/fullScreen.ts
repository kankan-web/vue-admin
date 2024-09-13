import {ElLoading} from 'element-plus'

let loadingInstance:ReturnType<typeof ElLoading.service>;

//开启loading
const startLoading=()=>{
  loadingInstance=ElLoading.service({
    fullscreen:true,
    lock:true,
    text:'加载中...',
    background:'rgba(0,0,0,0.7)'
  })
}

//结束loading
const endLoading=()=>{
  loadingInstance.close()
}

//显示全屏加载
let needLoadingRequestCount=0

export const showFullScreenLoading=()=>{
  if(needLoadingRequestCount===0){
    startLoading()
  }
  needLoadingRequestCount++
}

//隐藏全屏加载
export const hideFullScreenLoading=()=>{
  if(needLoadingRequestCount<=0) return
  needLoadingRequestCount--
  if(needLoadingRequestCount===0){
    endLoading()
  }
}
