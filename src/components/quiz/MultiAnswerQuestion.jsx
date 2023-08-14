import { useContext, useEffect, useState } from "react"
import Store from "../../Store"
import { useNavigate } from "react-router-dom"
import { BsArrowRight } from "react-icons/bs"
import styles from "./quiz.module.css"
import { questions, answers, answerAplhabeticalIndex } from "../../data"

const MultiAnswerQuestion = () => {
  const {
    state: { currentStep },
    dispatch,
  } = useContext(Store)

  useEffect(() => {}, [currentStep])

  const navigate = useNavigate()

  const [selectedAnswers, setSelectedAnswers] = useState([])
  const [selectedOptions, setSelectedOptions] = useState([])

  const handleSelect = (e) => {
    const clickedOption = e.target
    const optionValue = clickedOption.value

    if (selectedOptions.includes(optionValue)) {
      setSelectedOptions(
        selectedOptions.filter((value) => value !== optionValue)
      )
      clickedOption.classList.remove(styles.answerSelected)
      const newAnswers = selectedAnswers.filter(
        (value) => value !== optionValue
      )
      setSelectedAnswers(newAnswers)
    } else {
      setSelectedOptions([...selectedOptions, optionValue])
      clickedOption.classList.add(styles.answerSelected)
      setSelectedAnswers((prev) => [...prev, optionValue])
    }
  }

  const handleNext = () => {
    setSelectedAnswers([])
    setSelectedOptions([])
    const allOptions = document.querySelectorAll("option")
    allOptions.forEach((op) => op.classList.remove(`${styles.answerSelected}`))

    dispatch({
      type: "NEXT_QUESTION",
      payload: { selectedAnswers },
    })
  }

  const handleBack = () => {
    setSelectedAnswers([])
    setSelectedOptions([])
    const allOptions = document.querySelectorAll("option")
    allOptions.forEach((op) => op.classList.remove(`${styles.answerSelected}`))

    dispatch({
      type: "PREV_QUESTION",
    })
  }

  const handleResults = () => {
    setSelectedAnswers([])
    setSelectedOptions([])
    const allOptions = document.querySelectorAll("option")
    allOptions.forEach((op) => op.classList.remove(`${styles.answerSelected}`))

    dispatch({
      type: "LAST_QUESTION",
      payload: { selectedAnswers },
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
              disabled={selectedAnswers.length === 0 ? true : false}
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
              disabled={selectedAnswers.length === 0 ? true : false}
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
export default MultiAnswerQuestion
