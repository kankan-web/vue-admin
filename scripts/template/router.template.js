export default name => `
export default {
  path: '/${name.toLowerCase()}',
  name: '${name}',
  component: () => import('@/view/${name}/index.vue'),
  meta: {
    title: '${name}',
    requiresAuth: true,
    icon: 'el-icon-document'
  }
}
`
