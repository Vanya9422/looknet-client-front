export default ({ app }) => {
  if (!process.client) return;
  app.$echo.connector.options.auth.headers.Authorization = `Bearer ${app.$auth.strategy.token.get()}`;
}
