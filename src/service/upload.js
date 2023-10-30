
export async function upload(user, data) {

const host = 'http://localhost:5000/data/upload';

const options = {
    method: 'POST',
    headers: {},
};

if (user) {
    options.headers['X-Authorization'] = user.accessToken;
    if (user._role == 'admin') {
        options.headers.user = JSON.stringify(user);
    }
}

if (data) {
    options.body = data;
}

try {
    const response = await fetch(host, options);
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
    alert(error.message);
    throw error;
  } 
}