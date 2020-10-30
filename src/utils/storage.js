export default {
  setItem: async function setItem(key, item) {
    try {
      return await localStorage.setItem(key, JSON.stringify(item));
    } catch (error) {}

    return true;
  },
  getItem: async function getItem(key) {
    try {
      const retrievedItem = await localStorage.getItem(key);
      return JSON.parse(retrievedItem);
    } catch (error) {}

    return true;
  },
  removeItem: async function getItem(key) {
    try {
      return await localStorage.removeItem(key);
    } catch (error) {}

    return true;
  },
  clear: async () => {
    try {
      return await localStorage.clear().then(() => localStorage.setItem('isFirstTime', 'NO'));
    } catch (error) {}

    return true;
  },
};
