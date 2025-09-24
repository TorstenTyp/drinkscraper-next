import styles from '../style/cards.module.css';

export default function CardGridSkeleton() {
  return (
    <>
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className={styles['cards--container']} style={{ pointerEvents: 'none' }}>
          <div className={`${styles['cards--image-container']} ${styles.shimmer}`}>
            <div className={styles['cards--image']} />
          </div>

          <div className={styles['cards--content']}>
            <div className={styles['cards--header']}>
              <div className={`${styles['cards--title']} ${styles['skeleton-text']}`} style={{ width: '70%', height: '1.5rem' }} />
            </div>

            <div className={styles['cards--ingredients']}>
              <div className={styles['skeleton-lines']}>
                <div className={styles['skeleton-text']} style={{ width: '100%', height: '1rem' }} />
                <div className={styles['skeleton-text']} style={{ width: '90%', height: '1rem' }} />
                <div className={styles['skeleton-text']} style={{ width: '80%', height: '1rem' }} />
              </div>
            </div>

            <div className={styles['cards--footer']}>
              <div className={`${styles['cards--source']} ${styles['skeleton-text']}`} style={{ width: '40%', height: '0.875rem' }} />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}