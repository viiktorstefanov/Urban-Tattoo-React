import { toast } from 'react-toastify';

const notifyInfo = (message, autoClose) => toast.info(message, {
        position: "top-left",
        autoClose: autoClose || 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
});

const notifySuccess = (message, autoClose) => toast.success(message, {
    position: "top-left",
    autoClose: autoClose || 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
});

const notifyWarning = (message, autoClose) => toast.warn(message, {
    position: "top-left",
    autoClose: autoClose || 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
});

const notifyError = (message, autoClose) => toast.error(message, {
    position: "top-left",
    autoClose: autoClose || 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
});

const notifyLoading = (message) => toast.loading(message, {
    position: "top-left",
    autoClose: 0,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
});

export {
    notifyInfo,
    notifySuccess,
    notifyWarning,
    notifyError,
    notifyLoading
}