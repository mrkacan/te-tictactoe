export default {
  setItem: async function setItem(key, item) {
    try {
      return await localStorage.setItem(key, JSON.stringify(item))
    } catch (error) {}
  },
  getItem: async function getItem(key) {
    try {
      const retrievedItem = await localStorage.getItem(key)
      return JSON.parse(retrievedItem)
    } catch (error) {}
  },
  removeItem: async function getItem(key) {
    try {
      return await localStorage.removeItem(key)
    } catch (error) {}
  },
  clear: async () => {
    try {
      console.log('####_LOCAL_STORAGE_CLEARED_####')
      return await localStorage.clear().then(() => {
        return localStorage.setItem('isFirstTime', 'NO')
      })
    } catch (error) {}
  },
}
