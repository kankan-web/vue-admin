export default name => `import request from '@/utils/http'

const baseUrl = '/api/${name.toLowerCase()}'

// 获取${name}列表
export function fetch${name}List(params) {
  return request.get(\`\${baseUrl}/list\`, params)
}

// 获取${name}详情
export function fetch${name}Detail(id) {
  return request.get(\`\${baseUrl}/\${id}\`)
}

// 创建${name}
export function create${name}(data) {
  return request.post(baseUrl, data)
}

// 更新${name}
export function update${name}(id, data) {
  return request.put(\`\${baseUrl}/\${id}\`, data)
}

// 删除${name}
export function delete${name}(id) {
  return request.delete(\`\${baseUrl}/\${id}\`)
}
`
