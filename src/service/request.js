const host = 'https://urban-tattoo-server-production.up.railway.app';
// const host = 'http://localhost:5000';


async function request(method, url, data, user) {
  const options = {
    method,
    headers: {},
  };
  
  if(user) {
    options.headers['Urban-Authorization'] = JSON.stringify(user.accessToken);
    options.headers.user = JSON.stringify(user);
  }
  
  if (data && !data.files) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(data);
  }
  if(data && data.files) {
    options.body = data.files;
  }

  try {
    const response = await fetch(`${host}${url}`, options);

    if(response.status === 204 ) {
      return response;
    }

    if(!response.ok) {
      const error = await response.json();
      error.status = response.status;
      throw error;
    }

    return response.json();
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
