import  { get, post, del, put }  from './request'

const endpoints = {
    allTattoos: 'data/tattoos',
    upload: 'data/upload',
    delete: 'data/tattoos/',
}

const getAllTattoos = async () => get(endpoints.allTattoos);

const uploadTattoo = async (data, user) => post(endpoints.upload, data, user);

const deleteTattoo = async (id, user) => del(endpoints.delete + id, null, user);

const likeTattoo = async(id, user) => get(`/data/${id}/likes`, null, user);

const dislikeTattoo = async(id, user) => del(`/data/${id}/likes`, null, user);

const getTattooPropsById = async (id) => get(`/data/${id}/comments`);

const editTattooCommentById = async (id, data, user) => put(`/data/${id}/comments`, data, user);

const addTattooCommentById = async (id, data, user) => post(`/data/${id}/comments`, data, user);

const deleteTattooCommentById = async (id, user) => del(`/data/${id}/comments`, null ,user);

export {
    getAllTattoos,
    uploadTattoo,
    deleteTattoo,
    likeTattoo,
    dislikeTattoo,
    getTattooPropsById,
    editTattooCommentById,
    addTattooCommentById,
    deleteTattooCommentById,
}
