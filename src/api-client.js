import * as auth from './auth-provider';
import { apiURL } from './app-config';

async function client(
  endpoint,
  { data, token, method, headers: customHeaders, ...customConfig } = {},
) {
  const config = {
    method: method || (data ? 'POST' : 'GET'),
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
      'Content-Type': data ? 'application/json' : undefined,
      ...customHeaders,
    },
    ...customConfig,
  };

  const url = `${apiURL}/${endpoint}`
  return window
    .fetch(url, config)
    .then(async (response) => {
      // console.log('**************');
      // console.log('url', url);
      if (response.status === 401) {
        await auth.logout();
        return Promise.reject({ message: 'Please re-authenticate.' });
      }
      const data = await response.json();
      // console.log('data', data);
      // console.log('**************');
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
}

export { client };
