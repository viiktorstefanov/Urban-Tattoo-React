import { toast } from 'react-toastify';

let id;

const notification = {
     info : (message, autoClose) => toast.info(message, {
        position: "top-left",
        autoClose: autoClose || 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
}),

success : (message, autoClose) => {
    toast.success(message, {
    position: "top-left",
    autoClose: autoClose || 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "dark",
})},

 warning : (message, autoClose) => toast.warn(message, {
    position: "top-left",
    autoClose: 3000 || autoClose,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "dark",
}),

 error : (message, autoClose) => toast.error(message, {
    position: "top-left",
    autoClose: autoClose || 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "dark",
}),

 loading : (message) => {
    id = toast.loading(message);
},

 update : (newMessage, autoClose, type) => toast.update(id, { 
    render: newMessage, type: type || 'success', isLoading: false , autoClose: autoClose || 2000, hideProgressBar: true
}),

destroy: () => toast.dismiss(),

};

export default notification;