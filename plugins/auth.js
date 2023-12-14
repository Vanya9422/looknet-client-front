export default ({ app }) => {
  app.$auth.$storage.watchState('loggedIn', (loggedIn) => {
    if (loggedIn) return;
    app.router.replace({
      query: {
        hash: Date.now(),
      },
    });
  });
}
