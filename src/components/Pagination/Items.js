import styles from './Items.module.css';

export default function Items({ currentItems, openFullImg }) {
    return (
      <div className={styles['wrapper-images']}>
        {currentItems &&
          currentItems.map((item) => (
            <div key={item._id} className={styles['pics']}>
              <img className={styles['tattoo-img']} onClick={() => openFullImg(item.imageUrl, item._id, item.likes, item.ownerId)} src={item.imageUrl} alt="tattoo" />
            </div>
          ))}
      </div>
    );
  };