import { useState, useEffect } from "react"
import PropTypes from "prop-types"
import InfoCard from "./InfoCard"
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md"

import ProductCard from "./ProductCard"
import SkeletonCard from "./SkeletonCard"
import styles from "./products.module.css"

const Slider = ({ products, skeleton, otherWishListProducts }) => {
  const [index, setIndex] = useState(1)
  const [displayWidth, setDisplayWidth] = useState(window.innerWidth)
  const [itemsPerSlide, setItemsPerSlide] = useState(3)

  let array

  if (skeleton) {
    array = [
      <InfoCard key={"info"} />,
      ...Array.from({ length: 8 }, (_, index) => <SkeletonCard key={index} />),
    ]
  } else if (!otherWishListProducts) {
    array = [
      <InfoCard key={"info"} />,
      ...products
        .slice(0, 8)
        .map((product, i) => <ProductCard key={i} product={product} />),
    ]
  } else {
    array = [
      <InfoCard key={"info"} />,
      ...otherWishListProducts.map((product, i) => (
        <ProductCard key={`wishlist${i}`} product={product} />
      )),
      ...products
        .slice(0, 8)
        .map((product, i) => <ProductCard key={i} product={product} />),
    ]
  }

  const handleResize = () => {
    setDisplayWidth(window.innerWidth)
  }

  const revertSliderToStart = () => {
    const cards = document.querySelectorAll(`.${styles.slideElement}`)
    cards.forEach((card) => {
      card.style.transform = `translateX(0)`
    })
    setIndex(1)
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize)

    if (displayWidth > 1200 && itemsPerSlide !== 3) {
      revertSliderToStart()
      setItemsPerSlide(3)
    }
    if (displayWidth <= 1200 && displayWidth > 850 && itemsPerSlide !== 2) {
      revertSliderToStart()
      setItemsPerSlide(2)
    }
    if (displayWidth <= 850 && itemsPerSlide !== 1) {
      revertSliderToStart()
      setItemsPerSlide(1)
    }

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [displayWidth, itemsPerSlide])

  const handleNext = () => {
    const cards = document.querySelectorAll(`.${styles.slideElement}`)
    cards.forEach((card) => {
      card.style.transform = `translateX(-${
        100 * index * itemsPerSlide
      }%) translateX(-${1 * index * itemsPerSlide}rem)`
    })
    setIndex((prev) => prev + 1)
  }

  const handlePrev = () => {
    const cards = document.querySelectorAll(`.${styles.slideElement}`)
    cards.forEach((card) => {
      card.style.transform = `translateX(-${
        100 * (index - 2) * itemsPerSlide
      }%) translateX(-${1 * (index - 2) * itemsPerSlide}rem)`
    })
    setIndex((prev) => prev - 1)
  }

  const handleSlidePick = (value) => {
    const cards = document.querySelectorAll(`.${styles.slideElement}`)
    cards.forEach((card) => {
      card.style.transform = `translateX(-${
        100 * value * itemsPerSlide
      }%) translateX(-${1 * value * itemsPerSlide}rem)`
    })
    setIndex(value + 1)
  }

  const SliderDots = () => {
    const num = Math.ceil(array.length / itemsPerSlide)
    let slideArr = []
    for (let i = 0; i < num; i++) {
      slideArr.push(
        <div
          key={i}
          className={
            i + 1 === index ? `${styles.active} ${styles.dot}` : `${styles.dot}`
          }
          onClick={() => handleSlidePick(i)}
        ></div>
      )
    }
    return slideArr
  }

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.slider}>
        {array}

        <button
          className={styles.prevBtn}
          disabled={index === 1}
          onClick={handlePrev}
        >
          <MdNavigateBefore />
        </button>
        <button
          className={styles.nextBtn}
          disabled={index * itemsPerSlide >= array.length}
          onClick={handleNext}
        >
          <MdNavigateNext />
        </button>
      </div>
      <h4 className={styles.slideDots}>
        <SliderDots />
      </h4>
    </div>
  )
}

Slider.propTypes = {
  products: PropTypes.array,
  skeleton: PropTypes.bool,
  otherWishListProducts: PropTypes.array || PropTypes.bool,
}

export default Slider
