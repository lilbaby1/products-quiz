import PropTypes from "prop-types"
import styles from "./circle.module.css"

const Circle = ({ currentStep, totalSteps }) => {
  const strokeDashoffset = 280 - (280 / totalSteps) * (currentStep + 1)

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <svg className={styles.circleSvg} width={100} height={100}>
          <circle
            className={styles.fullCircle}
            cx={50}
            cy={50}
            r={44}
            fill="transparent"
            stroke="#EEF7FB"
            strokeWidth={6}
          />
          <circle
            className={styles.progressCircle}
            cx={50}
            cy={50}
            r={44}
            fill="transparent"
            stroke="#AADDF3"
            strokeWidth={6}
            style={{ strokeDashoffset }}
          />
        </svg>
        <p className={styles.text}>{currentStep + 1 + "/" + totalSteps}</p>
      </div>
    </div>
  )
}

Circle.propTypes = {
  currentStep: PropTypes.number,
  totalSteps: PropTypes.number,
}

export default Circle
