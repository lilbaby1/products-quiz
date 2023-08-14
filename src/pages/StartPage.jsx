import { useContext } from "react"
import Store from "../Store"
import { Link } from "react-router-dom"
import image from "../images/image1.png"
import styles from "./pages.module.css"

const StartPage = () => {
  const {
    state: { isQuizCompleted, currentStep },
    dispatch,
  } = useContext(Store)

  const handleRetake = () => {
    dispatch({
      type: "RETAKE",
    })
  }

  return (
    <div className={styles.startPage}>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>
          Build a self care routine suitable for you
        </h1>
        <p className={styles.descStart}>
          Take out test to get a personalised self care routine based on your
          needs.
        </p>
        {/* This button is to start the quiz if the user hasn't already started doing it AND hasn't finished it */}
        {!isQuizCompleted && currentStep === 0 && (
          <Link to="quiz">
            <button className={styles.startButton}>
              <span className={styles.startBtnText}>Start the quiz</span>
            </button>
          </Link>
        )}
        {/* This button is to start the quiz if the user HAS already started doing it BUT hasn't finished it */}
        {!isQuizCompleted && currentStep !== 0 && (
          <Link to="quiz">
            <button className={styles.startButton}>
              <span className={styles.startBtnText}>Continue quiz</span>
            </button>
          </Link>
        )}
        {/* These buttons are displayed when the user HAS FINISHED the quiz and would either like to do it again or see his/her results */}
        {isQuizCompleted && (
          <div className={styles.startButtons}>
            <Link to="results">
              <button className={styles.resultsButton}>
                <span className={styles.resultsBtnText}>See your results</span>
              </button>
            </Link>
            <Link to="quiz">
              <button onClick={handleRetake} className={styles.startButton}>
                <span className={styles.resultsBtnText}>Retake the quiz</span>
              </button>
            </Link>
          </div>
        )}
      </div>
      <div className={styles.startImgContainer}>
        <img className={styles.startPageImg} src={image} alt="cover" />
      </div>
    </div>
  )
}
export default StartPage
