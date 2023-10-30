import { clearUser, getUser } from '../services/util.js';

const host = 'http://localhost:5000';

async function request(method, url, data) {
  const options = {
    method,
    headers: {},
  };

  const user = getUser();
  if (user) {
    options.headers['X-Authorization'] = user.accessToken;
    options.headers.user = JSON.stringify(user);
  }

  if (data) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`${host}${url}`, options);

    let result;
    if (response.status !== 204) {
      result = await response.json();
    }

    if (!response.ok) {
      if (response.status === 403) {
        clearUser();
      }

      throw result;
    }

    return result;
  } catch (error) {
    alert(error.message);
    throw error;
  }
}

export const get = request.bind(null, 'get');
export const post = request.bind(null, 'post');
export const put = request.bind(null, 'put');
export const del = request.bind(null, 'delete');
