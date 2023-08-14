import { useContext } from "react"
import Store from "../../Store"
import { Link } from "react-router-dom"
import styles from "./quiz.module.css"

const QuizCompleted = () => {
  const { dispatch } = useContext(Store)

  const handleRetake = () => {
    dispatch({
      type: "RETAKE",
    })
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.questionContainer}>
        <h1 className={styles.title}>
          You have already completed the cosmetics quiz.
        </h1>
        <p className={styles.desc}>
          You can check your results to see cosmetics recomendations based on
          your answers or you can retake the quiz.
        </p>
        <div className={styles.completedButtons}>
          <Link to="../results" className={styles.deactivatedLink}>
            <button className={styles.showResultsBtn}>
              <span>See your results</span>
            </button>
          </Link>
          <button onClick={handleRetake} className={styles.retakeBtn}>
            <span>Retake the quiz</span>
          </button>
        </div>
      </div>
    </div>
  )
}
export default QuizCompleted
