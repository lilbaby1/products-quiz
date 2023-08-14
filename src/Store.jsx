import { createContext, useReducer } from "react"
import PropTypes from "prop-types"

const initialState = {
  wishList: localStorage.getItem("skincareWishList")
    ? JSON.parse(localStorage.getItem("skincareWishList"))
    : [],
  currentStep: localStorage.getItem("skincareCurrentStep")
    ? Number(localStorage.getItem("skincareCurrentStep"))
    : 0,
  questionAnswers: localStorage.getItem("skincareAnswers")
    ? JSON.parse(localStorage.getItem("skincareAnswers"))
    : [],
  isQuizCompleted: localStorage.getItem("isQuizCompleted")
    ? JSON.parse(localStorage.getItem("isQuizCompleted"))
    : false,
}

const reducer = (state, action) => {
  switch (action.type) {
    case "NEXT_QUESTION": {
      const selectedAnswers = [...Object.values(action.payload)]
      const questionAnswers = [...state.questionAnswers, ...selectedAnswers]
      localStorage.setItem("skincareCurrentStep", state.currentStep + 1)
      localStorage.setItem("skincareAnswers", JSON.stringify(questionAnswers))
      return {
        ...state,
        currentStep: state.currentStep + 1,
        questionAnswers,
      }
    }
    case "PREV_QUESTION": {
      const currentStep = state.currentStep - 1
      const questionAnswers = state.questionAnswers.slice(0, -1)
      localStorage.setItem("skincareCurrentStep", currentStep)
      localStorage.setItem("skincareAnswers", JSON.stringify(questionAnswers))
      return {
        ...state,
        currentStep,
        questionAnswers,
      }
    }
    case "LAST_QUESTION": {
      const selectedAnswers = [...Object.values(action.payload)]
      const questionAnswers = [...state.questionAnswers, ...selectedAnswers]
      localStorage.setItem("skincareCurrentStep", state.currentStep + 1)
      localStorage.setItem("skincareAnswers", JSON.stringify(questionAnswers))
      localStorage.setItem("isQuizCompleted", true)
      return {
        ...state,
        isQuizCompleted: true,
        currentStep: state.currentStep + 1,
        questionAnswers,
      }
    }
    case "RETAKE": {
      localStorage.setItem("skincareCurrentStep", 0)
      localStorage.setItem("skincareAnswers", JSON.stringify([]))
      localStorage.setItem("isQuizCompleted", false)
      return {
        ...initialState,
        currentStep: 0,
        questionAnswers: [],
        isQuizCompleted: false,
      }
    }
    case "ADD_TO_WISHLIST": {
      let product = Object.values(action.payload)[0]
      const newWishList = [...state.wishList, product]
      localStorage.setItem("skincareWishList", JSON.stringify(newWishList))
      return {
        ...state,
        wishList: newWishList,
      }
    }
    case "REMOVE_FROM_WISHLIST": {
      let productId = Object.values(action.payload)[0]
      const newWishList = state.wishList.filter(
        (product) => product.id !== productId
      )
      localStorage.setItem("skincareWishList", JSON.stringify(newWishList))
      return {
        ...state,
        wishList: newWishList,
      }
    }
    default:
      return state
  }
}

const defaultDispatch = () => initialState

const Store = createContext({
  state: initialState,
  dispatch: defaultDispatch,
})

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
}

StoreProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Store
