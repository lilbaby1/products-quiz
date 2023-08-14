import { useMemo, useContext } from "react"
import Store from "../Store"
import { useNavigate } from "react-router-dom"
import { useQuery } from "react-query"
import { getProducts } from "../api/productsApi"
import { mapToKeywords, getProductRecommendations } from "../utils"

import Slider from "../components/products/Slider"

import image from "../images/image2.png"
import styles from "./pages.module.css"

const ResultsPage = () => {
  const {
    dispatch,
    state: { isQuizCompleted, wishList },
  } = useContext(Store)
  const navigate = useNavigate()

  const [memoizedWishList, memoizedIds] = useMemo(() => {
    const wishListMemo = wishList
    const wishListIds = wishList.map((product) => product.id)
    return [wishListMemo, wishListIds]
  }, [])

  const questionAnswers = localStorage.getItem("skincareAnswers")
    ? JSON.parse(localStorage.getItem("skincareAnswers"))
    : []

  // Creates an array of keywords that are based on the user's answers to the questions.
  // This array is used in order to create recommendations.
  const keywordList = mapToKeywords(questionAnswers)

  const { isLoading, data: products } = useQuery("products", getProducts, {
    select: (data) => {
      const sortedData = getProductRecommendations(keywordList, data) // Returns an array with product recommendations based on the keywordList.
        .sort((a, b) => {
          // Sorts the array in a way that places the products which are in the wishlist to be before the others.
          const aIsInWishList = memoizedIds.includes(a.id)
          const bIsInWishList = memoizedIds.includes(b.id)

          if (aIsInWishList && !bIsInWishList) {
            return -1
          } else if (!aIsInWishList && bIsInWishList) {
            return 1
          } else {
            return 0
          }
        })
      return sortedData
    },
  })

  const handleRetake = () => {
    // setResetMemo((prev) => !prev)
    dispatch({ type: "RETAKE" })
    navigate("../quiz")
    window.location.reload() // Used in order to reset the memoized wishList
  }

  const handleToQuiz = () => {
    // setResetMemo((prev) => !prev)
    navigate("../quiz")
  }

  // If the data is loading then render a Slider component with Skeleton Cards to let the user know products are being loaded.
  let slider
  if (isLoading) {
    slider = <Slider skeleton products={[]} />
  } else {
    const productIds = products.map((product) => product.id)
    let otherWishListProducts = memoizedWishList.filter(
      (product) => !productIds.includes(product.id)
    )
    slider = (
      <Slider
        products={products}
        otherWishListProducts={otherWishListProducts}
      />
    )
  }

  return (
    <div className={styles.resultsPage}>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>Build you everyday self care routine.</h1>
        <p className={styles.descResults}>
          Perfect for if {"you're"} looking for soft, nourished skin, our
          moisturizing body washes are made with skin-natural nutrients that
          work with your skin to replenish moisture. With a light formula, the
          bubbly lather leaves your skin feeling cleansed and cared for. And by
          choosing relaxing fragrances you can add a moment of calm to the end
          of your day.
        </p>

        {isQuizCompleted ? (
          <button onClick={handleRetake} className={styles.resultsButton}>
            <span className={styles.resultsBtnText}>Retake the quiz</span>
          </button>
        ) : (
          <button onClick={handleToQuiz} className={styles.resultsButton}>
            <span className={styles.resultsBtnText}>
              Complete the quiz to see results
            </span>
          </button>
        )}
      </div>
      <div className={styles.resultsImgContainer}>
        <img className={styles.resultsPageImg} src={image} alt="cover" />
      </div>
      {isQuizCompleted && (
        <section className={styles.productsSection}>{slider}</section>
      )}
    </div>
  )
}
export default ResultsPage
