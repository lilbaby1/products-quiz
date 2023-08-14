import styles from "./products.module.css"

const SkeletonCard = () => {
  return (
    <div className={`${styles.skeletonCard} ${styles.slideElement}`}>
      <div className={styles.skeletonWrapper}>
        <div
          className={`${styles.skeletonImgContainer} ${styles.animatePulse}`}
        ></div>
        <div
          className={`${styles.skeletonProductTextWrapper} ${styles.animatePulse}`}
        >
          <div
            className={`${styles.skeletonText} ${styles.animatePulse}`}
          ></div>
          <div
            className={`${styles.skeletonText} ${styles.animatePulse}`}
          ></div>
          <div
            className={`${styles.skeletonText} ${styles.animatePulse}`}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default SkeletonCard
