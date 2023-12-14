
const createInstance = (maxConcurrent = 10, $axios) => {
  if (maxConcurrent < 1) {
    throw "Concurrency Manager Error: minimun concurrent is 1";
  }
  const queue = [];
  const running = [];
  const shift = () => {
    running.shift();
    if (queue.length) {
      const queued = queue.shift();
      const cancelToken = $axios.CancelToken.source();
      queued.request.cancelToken = cancelToken.token;
      queued.cancel = cancelToken.cancel;
      queued.resolver(queued.request);
      running.push(queued);
    }
  };
  const shiftInitial = () => {
    setTimeout(() => {
      if (running.length < maxConcurrent) {
        shift();
      }
    }, 0);
  };
  const push = (reqHandler) => {
    queue.push(reqHandler);
    shiftInitial();
  };
  const clear = (message) => {
    queue.length = 0;
    running.forEach((reqHandler) => {
      reqHandler.cancel(message);
    });
    running.length = 0;
  }
  return { push, shift, clear };
};

const concurrents = {
  products: {
    maxConcurrent: 1,
    matches: '/products', // можно вставлять массив
  },
};

const getInstanceName = (config) => {
  const [url] = config.url.split('?');
  const name = Object.keys(concurrents).find((key) => {
    if (typeof concurrents[key].matches === 'string') {
      return url.includes(concurrents[key].matches);
    }
    if (Array.isArray(concurrents[key].matches)) {
      return concurrents[key].matches.some((match) => url.includes(match));
    }
  });
  return name || 'other';
};

export default ({ $axios, i18n, $cookies }) => {

  const token = process.client ? localStorage.getItem("auth._token.laravelSanctum") : $cookies.get('auth._token.laravelSanctum');
  $axios.setToken(token, "Bearer");

  const maxConcurrent = 10;
  const instances = {};
  const interceptors = {
    request: null,
    response: null,
  };

  const requestHandler = (config) => {
    config.headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Accept-Language': i18n.localeProperties.code,
    };
    const instanceName = getInstanceName(config);
    if (!instances[instanceName]) {
      instances[instanceName] = createInstance(concurrents[instanceName]?.maxConcurrent || maxConcurrent, $axios);
    }
    return new Promise(resolve => {
      instances[instanceName].push({ request: config, resolver: resolve });
    });
  };

  const responseHandler = (response) => {
    const instanceName = getInstanceName(response.config);
    instances[instanceName].shift();
    return response;
  };

  const responseErrorHandler = (error) => {
    if (typeof error === 'object' && error.config) {
      const instanceName = getInstanceName(error.config);
      instances[instanceName].shift();
      // Вывод информации о запросе в консоль
      console.log(`Ошибка запроса к URL: ${error.config.url}`);
      if (error.response) {
        // Вывод кода ошибки, если есть объект ответа
        console.log(`Код ошибки: ${error.response.status}`);
      } else {
        console.log('Ошибка не содержит ответа');
      }
    }
    return Promise.reject(error);
  };

  const cancel = (name) => {
    if (instances[name]) {
      instances[name].clear(name);
    }
  };

  const cancelAll = () => {
    Object.keys(instances).forEach((name) => {
      instances[name].clear();
    });
  };

  // включает контроллер
  const attach = () => {
    interceptors.request = $axios.interceptors.request.use(
      requestHandler
    );
    interceptors.response = $axios.interceptors.response.use(
      responseHandler,
      responseErrorHandler,
    );
  };

  // отключает контроллер
  const detach = () => {
    clear();
    $axios.interceptors.request.eject(interceptors.request);
    $axios.interceptors.response.eject(interceptors.response);
  };

  attach();

  $axios.requestManager = { attach, detach, cancel, cancelAll };
};
