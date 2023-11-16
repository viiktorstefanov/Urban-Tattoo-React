import  { get, post, del }  from './request'

const endpoints = {
    allTattoos: '/data/tattoos',
    upload: '/data/upload',
    delete: '/data/tattoos/',
}

const getAllTattoos = async () => get(endpoints.allTattoos);

const uploadTattoo = async (data, user) => post(endpoints.upload, data, user);

const deleteTattoo = async (id, user) => del(endpoints.delete + id, null, user);

export {
    getAllTattoos,
    uploadTattoo,
    deleteTattoo,
}
