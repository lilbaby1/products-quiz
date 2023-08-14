import { useContext, useState } from "react"
import Store from "../../Store"
import PropTypes from "prop-types"
import { BiHeart, BiSolidHeart } from "react-icons/bi"
import styles from "./products.module.css"

const ProductCard = ({ product }) => {
  const id = product.id
  const title = product.title
  const price = product.variants[0].price
  const image = product.images[0].src

  const {
    state: { wishList },
    dispatch,
  } = useContext(Store)

  const [isProductInWishlist, setIsProductInWishlist] = useState(
    wishList.find((obj) => obj.id === id) ? true : false
  )

  const handleClick = () => {
    if (!isProductInWishlist) {
      dispatch({
        type: "ADD_TO_WISHLIST",
        payload: { product },
      })
    } else {
      dispatch({
        type: "REMOVE_FROM_WISHLIST",
        payload: { id },
      })
    }
    setIsProductInWishlist((prev) => !prev)
  }

  return (
    <div className={`${styles.productCard} ${styles.slideElement}`}>
      <div className={styles.imgContainer}>
        <img src={image} alt="" className={styles.productImg} />
      </div>
      <div className={styles.productTextWrapper}>
        <h3 className={styles.productTitle}>{title}</h3>
        <p className={styles.productPrice}>${price}</p>
      </div>
      <i onClick={handleClick}>
        {isProductInWishlist ? (
          <BiSolidHeart className={styles.heart} />
        ) : (
          <BiHeart className={styles.heart} />
        )}
      </i>
    </div>
  )
}

ProductCard.propTypes = {
  product: PropTypes.object,
}

export default ProductCard
