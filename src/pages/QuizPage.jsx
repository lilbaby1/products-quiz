import { useContext } from "react"
import Store from "../Store"
import { questions } from "../data"

import SingleAnswerQuestion from "../components/quiz/SingleAnswerQuestion"
import MultiAnswerQuestion from "../components/quiz/MultiAnswerQuestion"
import Circle from "../components/quiz/Circle"
import QuizCompleted from "../components/quiz/QuizCompleted"

const QuizPage = () => {
  const {
    state: { currentStep, isQuizCompleted },
  } = useContext(Store)

  return (
    <>
      {!isQuizCompleted ? (
        <div>
          {questions[Number(currentStep)].multipleAnswers ? (
            <MultiAnswerQuestion />
          ) : (
            <SingleAnswerQuestion />
          )}
          <Circle currentStep={Number(currentStep)} totalSteps={5} />
        </div>
      ) : (
        <QuizCompleted />
      )}
    </>
  )
}
export default QuizPage
