import { createContext, useEffect, useState,  } from "react";
import { get, post, del } from "../service/request";
import { useNavigate } from "react-router-dom";

export const TattooContext = createContext();

export const TattoosProvider = ({ children }) => {
    const navigate = useNavigate();
    const [tattoos, setTattoos] = useState('');
    const [image, setImage] = useState('');
    const [model, setModel] = useState(false);
    const [tempImgSrc, setTempImgSrc] = useState('');
    const [id, setId] = useState('');
    const [ isImage, setIsImage] = useState(false);
    const [ haveFile, setHaveFile] = useState(false);
    const [ size, setSize] = useState(true);

    useEffect(() => {
        try {
            get('/data/tattoos')
                .then(res => setTattoos(res));

        } catch (error) {
            console.log(error);
        }
    }, []);

    const onSubmitUploadHandler = async (formData) => {
        try {
            const response = await post('/data/upload', formData);

            setTattoos(state => [...state, response]);
            navigate('/gallery');

        } catch (err) {
            console.log(err);;
        }
    };

    function openFullImg(imageUrl, id) {
        setModel(true);
        setTempImgSrc(imageUrl);
        setId(id);
    };

    async function deleteTattoo() {
        try {
            const deletePhoto = await del(`/data/tattoos/${id}`);
                setTattoos(state => state.filter(x => x._id !== id));
                setModel(false);
        } catch (error) {
            console.log(error);
        }

    };

    const fileHandler = (e) => {
        setHaveFile(true);
        if (e.target.files[0].size > 5000000) {
            setImage('');
            setSize(false);
            return;
        } else{
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

    const onFileSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('files', image);
        setImage('');
        onSubmitUploadHandler({ files: formData });
    };

    const TattoosValues = {
        tattoos,
        onSubmitUploadHandler,
        model,
        openFullImg,
        tempImgSrc,
        deleteTattoo,
        setModel,
        image,
        haveFile,
        isImage,
        size,
        fileHandler,
        onFileSubmit,
    };

    return (
        <>
            <TattooContext.Provider value={TattoosValues}>
                {children}
            </TattooContext.Provider>
        </>
    );
};
