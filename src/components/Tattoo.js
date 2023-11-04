

export default function Tattoo( { imageUrl, id }) {
    return (
        <>
        <img src={imageUrl} alt="no-img" data-id={id}/>
        </>
    );
};