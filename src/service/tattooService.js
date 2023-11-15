import  { get, post, del }  from './request'

const endpoints = {
    allTattoos: '/data/tattoos',
    upload: '/data/upload',
    delete: '/data/tattoos/',
}

const getAllTattoos = async () => get(endpoints.allTattoos);

const uploadTattoo = async (data) => post(endpoints.upload, data);

const deleteTattoo = async (id) => del(endpoints.delete + id);

export {
    getAllTattoos,
    uploadTattoo,
    deleteTattoo,
}
