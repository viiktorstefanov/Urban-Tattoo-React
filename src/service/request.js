const host = 'http://localhost:5000';

async function request(method, url, data) {
  const options = {
    method,
    headers: {},
  };

    // const user = getUser();
  // if (token) {
  //   options.headers['X-Authorization'] = token;
  //   options.headers.user = JSON.stringify(user);
  // }
  
  if (data && !data.files) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(data);
  }
  if(data && data.files) {
    options.body = data.files;
  }

  try {
    const response = await fetch(`${host}${url}`, options);

    let result;
    if (response.status !== 204) {
      result = await response.json();
    }

    if (!response.ok) {
      if (response.status === 403) {
        // clearUser();
      }

      throw result;
    }

    return result;
  } catch (error) {
    throw error;
  }
}

 const get = request.bind(null, 'get');
 const post = request.bind(null, 'post');
 const put = request.bind(null, 'put');
 const del = request.bind(null, 'delete');

export {
    get,
    post,
    put,
    del
}
