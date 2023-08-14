import { useContext, useState } from "react"
import Store from "../../Store"
import { useNavigate } from "react-router-dom"
import { BsArrowRight } from "react-icons/bs"
import styles from "./quiz.module.css"
import { questions, answers, answerAplhabeticalIndex } from "../../data"

const SingleAnswerQuestion = () => {
  const {
    state: { currentStep },
    dispatch,
  } = useContext(Store)

  const navigate = useNavigate("/results")

  const [selectedAnswer, setSelectedAnswer] = useState("")
  const [selectedOption, setSelectedOption] = useState(null)

  const handleSelect = (e) => {
    if (selectedOption) {
      selectedOption.classList.remove(styles.answerSelected)
    }
    e.target.classList.add(styles.answerSelected)

    setSelectedOption(e.target)
    setSelectedAnswer(e.target.value)
  }

  const handleNext = () => {
    setSelectedAnswer("")
    setSelectedOption(null)
    const allOptions = document.querySelectorAll("option")
    allOptions.forEach((op) => op.classList.remove(`${styles.answerSelected}`))

    dispatch({
      type: "NEXT_QUESTION",
      payload: { selectedAnswer },
    })
  }

  const handleBack = () => {
    setSelectedAnswer("")
    setSelectedOption(null)
    const allOptions = document.querySelectorAll("option")
    allOptions.forEach((op) => op.classList.remove(`${styles.answerSelected}`))

    if (currentStep === 0) {
      dispatch({
        type: "RETAKE",
      })
      navigate("../")
    } else {
      dispatch({
        type: "PREV_QUESTION",
      })
    }
  }

  const handleResults = () => {
    setSelectedAnswer("")
    setSelectedOption(null)
    const allOptions = document.querySelectorAll("option")
    allOptions.forEach((op) => op.classList.remove(`${styles.answerSelected}`))

    dispatch({
      type: "LAST_QUESTION",
      payload: { selectedAnswer },
    })
    navigate("/results")
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.questionContainer}>
        <h1 className={styles.title}>{questions[currentStep].question}</h1>
        <div className={styles.answersContainer}>
          {answers[currentStep].map((answer, index) => (
            <option
              key={index}
              id={index}
              className={`${styles.answer}`}
              onClick={(e) => handleSelect(e)}
              value={answer}
            >
              {answerAplhabeticalIndex[index] + "."} {answer}
            </option>
          ))}
        </div>
        <div className={styles.links}>
          <button className={styles.back} onClick={handleBack}>
            Back
          </button>

          {currentStep !== Object.keys(answers).length - 1 ? (
            <button
              className={styles.next}
              disabled={selectedAnswer ? false : true}
              onClick={handleNext}
            >
              Next question{" "}
              <BsArrowRight
                style={{ width: "20px", height: "20px", marginLeft: "6px" }}
              />
            </button>
          ) : (
            <button
              className={styles.next}
              disabled={selectedAnswer ? false : true}
              onClick={handleResults}
            >
              Discover your results
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
export default SingleAnswerQuestion
