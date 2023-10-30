const itemName = 'userData';

export function getUser() {
  return JSON.parse(localStorage.getItem(itemName));
}

export function setUser(data) {
  return localStorage.setItem(itemName, JSON.stringify(data));
}

export function clearUser() {
  localStorage.removeItem(itemName);
}


