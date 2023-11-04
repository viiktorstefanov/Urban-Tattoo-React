

export default function Tattoo( { imageUrl, id }) {

    function openFullImg(e) {
        // const imageId = e.currentTarget.attributes["data-id"].value;
    }

    return (
        <>
        <img onClick={openFullImg} src={imageUrl} alt="no-img" data-id={id}/>
        </>
    );
};