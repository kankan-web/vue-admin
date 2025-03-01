export default name => `import { defineStore } from 'pinia'

export const use${name}Store = defineStore('${name.toLowerCase()}', {
  state: () => ({
    ${name.toLowerCase()}List: [],
    currentItem: null,
    loading: false
  }),
  
  getters: {
    get${name}List: (state) => state.${name.toLowerCase()}List,
    getCurrentItem: (state) => state.currentItem
  },
  
  actions: {
    setData(data) {
      this.${name.toLowerCase()}List = data
    },
    setCurrentItem(item) {
      this.currentItem = item
    },
    resetState() {
      this.${name.toLowerCase()}List = []
      this.currentItem = null
    }
  }
})
`
