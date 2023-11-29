import { createContext, useContext, useEffect, useState, } from "react";
import { useNavigate } from "react-router-dom";
import { deleteTattoo, dislikeTattoo, getAllTattoos, likeTattoo, uploadTattoo } from "../service/tattooService";
import { AuthContext } from "../contexts/AuthContext";
import notification from "../service/notification";

export const TattooContext = createContext();

export const TattoosProvider = ({ children }) => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
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


    //get all tattoo images
    useEffect(() => {
        try {
            getAllTattoos().then(res => setTattoos(res));
        } catch (error) {
            console.log(error);
        }
    }, []);

    //upload tattoo image
    const uploadHandler = async (formData) => {
        try {
            notification.loading('Please wait');
            const result = await uploadTattoo(formData, user);
            setTattoos(state => [...state, result]);
            setHaveFile(false);
            navigate('/gallery');

        } catch (err) {
            console.log(err.message);;
        } finally {
            notification.update('Image uploaded');
            setImage('');
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
            notification.loading('Please wait');
            await deleteTattoo(id, user);
            setTattoos(state => state.filter(x => x._id !== id));
            setModel(false);
        } catch (error) {
            console.log(error);
        } finally {
            notification.update('Image was deleted');
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
            notification.loading('Please wait');
            await likeTattoo(id, user);
            setTattoos(state => state.map(x => x._id === id
                ? { ...x, likes: [...x.likes, user._id] }
                : x));
            setIsLiked(true);
        } catch (e) {
            console.log(e);
        } finally {
            notification.update('Liked');
        }
    };

    //unlike tattoo
    const unlikeHandler = async () => {
        try {
            notification.loading('Please wait');
            await dislikeTattoo(id, user);
            setTattoos((state) =>
                state.map((x) =>
                    x._id === id
                        ? { ...x, likes: x.likes.filter((like) => like !== user._id) }
                        : x
                )
            );
            setIsLiked(false);
        } catch (e) {
            console.log(e);
        } finally {
            notification.update('Unliked', 500, 'error');
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
    };

    return (
        <>
            <TattooContext.Provider value={TattoosValues}>
                {children}
            </TattooContext.Provider>
        </>
    );
};
