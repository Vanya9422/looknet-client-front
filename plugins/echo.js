import Echo from "laravel-echo";

if (process.client) {
  window.Pusher = require("pusher-js");
}

// export default function ({$axios , $auth}, inject) {
export default ({ app }, inject) => {
  // let token = app.$auth.strategy.token.get();
  const echo = new Echo({
    broadcaster: "pusher",
    key: process.env.WS_KEY, // .env
    wsHost: process.env.WS_HOST,
    authEndpoint: process.env.API_URL + "/broadcasting/auth",
    wsPort: process.env.WS_PORT,
    authModule: true,
    forceTLS: false,
    encrypted: true,
    disableStats: true,
    enabledTransports: ["ws", "wss"],
    auth: {
      headers: {
        Authorization: "Bearer " + app.$auth.strategy.token.get(),
      },
      withCredentials: true,
    },
  });

  inject("echo", echo);
};
