import MissingTattoos from "./MissingTattoos";
import Tattoo from "./Tattoo";
import styles from '../styles/components/Tattoos.module.css'

export default function Tattoos( { tattoos }) {
    return (
        <div className={styles['img-gallery']}>
                {tattoos.length > 0 ?
                    tattoos.map(tattoo => <Tattoo key={tattoo._id} imageUrl={tattoo.imageUrl} id={tattoo._id} />)
                    :
                    <MissingTattoos />}
            </div>
    );
};