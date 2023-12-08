import { createContext, useContext, useEffect, useState, } from "react";
import { useNavigate } from "react-router-dom";
import { deleteTattoo, dislikeTattoo, getAllTattoos, likeTattoo, uploadTattoo } from "../service/tattooService";
import { AuthContext } from "../contexts/AuthContext";
import notification from "../service/notification";

export const TattooContext = createContext();

export const TattoosProvider = ({ children }) => {
    const navigate = useNavigate();
    const { user, clearUser } = useContext(AuthContext);
    const [tattoos, setTattoos] = useState('');
    const [image, setImage] = useState('');
    const [model, setModel] = useState(false);
    const [tempImgSrc, setTempImgSrc] = useState('');
    const [id, setId] = useState('');
    const [isImage, setIsImage] = useState(false);
    const [haveFile, setHaveFile] = useState(false);
    const [size, setSize] = useState(true);
    const [isLiked, setIsLiked] = useState(false);
    const [isOwner, setIsOwner] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);

    //get all tattoo images
    useEffect(() => {
        getAllTattoos()
        .then(res => setTattoos(res))
        .catch((e) => {
            if (e.status !== 404) {
                return notification.error(e.message, 3000);
            }else {
               return navigate('*');
            }
        });
    }, []);

    //upload tattoo image
    const uploadHandler = async (formData) => {
        try {
            setIsSubmit(true);
            const result = await uploadTattoo(formData, user);
            notification.success('Image uploaded', 3000);
            setTattoos(state => [...state, result]);
            setHaveFile(false);
            setImage('');
            navigate('/gallery?page=1');

        } catch (e) {
            if(e.status === 404) {
                return navigate('*');
            }
            notification.error(e.message, 3000);
        } finally {
            setIsSubmit(false);
        }
    };
    const onFileSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('files', image);
        uploadHandler({ files: formData });
    };
    const onFileChange = (e) => {
        setHaveFile(true);
        if (e.target.files[0].size > 5000000) {
            setImage('');
            setSize(false);
            return;
        } else {
            setSize(true);
        }
        if (e.target.files[0].type === "image/jpeg" || e.target.files[0].type === "image/png") {
            setImage(e.target.files[0]);
            setIsImage(false);

        } else {
            setImage('');
            setIsImage(true);
            return;
        }
    };

    //delete tattoo image
    const deleteHandler = async () => {
        try {
            await deleteTattoo(id, user);
            notification.success('Image was deleted', 3000);
            setTattoos(state => state.filter(x => x._id !== id));
            setModel(false);
        } catch (e) {
            if (e.status === 401) {
                clearUser();
                navigate('/login');
                notification.error(e.message, 3000);
            } else if (e.status === 404) {
                return navigate('*')
            }
            notification.error(e.message, 3000);
        }
    };

    //open full-image-screen handler
    const openFullImg = (imageUrl, id, likes, ownerId) => {
        likes.some(x => x === user._id) ? setIsLiked(true) : setIsLiked(false);
        ownerId === user._id ? setIsOwner(true) : setIsOwner(false);
        setModel(true);
        setTempImgSrc(imageUrl);
        setId(id);
    };

    //close full-image-screen handlers
    const onEscPress = () => model ? setModel(false) : null;
    const onCloseIconClick = () => setModel(false);

    //like tattoo
    const likeHandler = async () => {
        try {
            await likeTattoo(id, user);
            notification.success('Liked', 3000);
            setTattoos(state => state.map(x => x._id === id
                ? { ...x, likes: [...x.likes, user._id] }
                : x));
            setIsLiked(true);
        } catch (e) {
            if (e.status === 401) {
                clearUser();
                navigate('/login');
                return notification.error('Your login attempt failed. Please check your username and password, and try again', 3000);
            }
            notification.error(e.message, 3000);
        }
    };

    //unlike tattoo
    const unlikeHandler = async () => {
        try {
            await dislikeTattoo(id, user);
            notification.success('Unliked', 3000);
            setTattoos((state) =>
                state.map((x) =>
                    x._id === id
                        ? { ...x, likes: x.likes.filter((like) => like !== user._id) }
                        : x
                )
            );
            setIsLiked(false);
        } catch (e) {
            if (e.status === 401) {
                clearUser();
                navigate('/login');
                return notification.error('Your login attempt failed. Please check your username and password, and try again', 3000);
            }
            notification.error(e.message, 3000);
        }
    };

    const TattoosValues = {
        tattoos,
        model,
        openFullImg,
        tempImgSrc,
        deleteHandler,
        image,
        haveFile,
        isImage,
        size,
        onFileChange,
        onFileSubmit,
        onEscPress,
        onCloseIconClick,
        id,
        isLiked,
        isOwner,
        likeHandler,
        unlikeHandler,
        setTattoos,
        isSubmit,
    };

    return (
        <>
            <TattooContext.Provider value={TattoosValues}>
                {children}
            </TattooContext.Provider>
        </>
    );
};
