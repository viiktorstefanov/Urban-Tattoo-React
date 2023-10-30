import { del, get, post, put } from './api.js';

const endpoints = {
  tattoos: '/data/tattoos',
  upload: '/data/upload',
};

export async function getTattoos() {
  return await get(endpoints.tattoos);
}

export async function deleteTattoo(id) {
  return await del(`${endpoints.tattoos}/${id}`);
}


