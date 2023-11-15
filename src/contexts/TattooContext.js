import { createContext, useEffect, useState,  } from "react";
import { useNavigate } from "react-router-dom";
import { deleteTattoo, getAllTattoos, uploadTattoo } from "../service/tattooService";


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

    //get all tattoo images
    useEffect(() => {
        try {
            getAllTattoos()
                .then(res => setTattoos(res));

        } catch (error) {
            console.log(error);
        }
    }, []);

    //upload tattoo image
    const uploadHandler = async (formData) => {
        try {
            const result = await uploadTattoo(formData);
            setTattoos(state => [...state, result]);
            setHaveFile(false);
            navigate('/gallery');

        } catch (err) {
            console.log(err);;
        }
    };
    const onFileSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('files', image);
        setImage('');
        uploadHandler({ files: formData });
    };
    const onFileChange = (e) => {
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

    //delete tattoo image
    const deleteHandler = async () => {
        try {
            await deleteTattoo(id);
            setTattoos(state => state.filter(x => x._id !== id));
            setModel(false);
    } catch (error) {
        console.log(error);
    }
    };
    
    //open image handler
    const openFullImg = (imageUrl, id) => {
        setModel(true);
        setTempImgSrc(imageUrl);
        setId(id);
    };

    //close image handlers
    const onEscPress = () => model ? setModel(false) : null ;
    const onCloseIconClick = () => setModel(false);


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
        onCloseIconClick
    };

    return (
        <>
            <TattooContext.Provider value={TattoosValues}>
                {children}
            </TattooContext.Provider>
        </>
    );
};
