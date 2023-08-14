import styles from "./products.module.css"

const InfoCard = () => {
  return (
    <div className={`${styles.infoCard} ${styles.slideElement}`}>
      <div className={styles.textWrapper}>
        <h3 className={styles.infoTitle}>Daily Routine</h3>
        <p className={styles.desc}>
          Perfect for if {"you're"} looking for soft, nourished skin, our
          moisturizing body washes are made with skin-natural nutrients that
          work with your skin to replenish moisture. With a light formula, the
          bubbly lather leaves your skin feeling cleansed and cared for. And by
          choosing relaxing fragrances you can add a moment of calm to the end
          of your day.
        </p>
      </div>
    </div>
  )
}
export default InfoCard
