export default  () => ({
  user: null,
  translate: process.client && typeof window !== 'undefined' ? +localStorage.getItem('translate') : 0,
})


