import { Link } from "react-router-dom"
import styles from "./pages.module.css"

const MissingPage = () => {
  return (
    <div className={styles.missingContainer}>
      <h1 className={`${styles.title} ${styles.missingTitle}`}>
        The page you are looking for does not exist.
      </h1>
      <Link className={styles.missingLink} to="/">
        Go to start page
      </Link>
    </div>
  )
}
export default MissingPage
