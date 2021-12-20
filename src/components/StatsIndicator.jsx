import styles from "../styles/StatsIndicator.module.scss";
import { FaArrowUp, FaArrowDown, FaCaretDown, FaCaretUp } from "react-icons/fa";

export function StatsIndicator({ value }) {

  return (

    <div className={Number(value) >= 0 ? styles.positivePerformace : styles.negativePerformace}>
      <span>
        {value >= 0 ? <FaCaretUp /> : <FaCaretDown />}
      </span>
      <span>{Math.abs(value)}%</span>
    </div>

  )
}