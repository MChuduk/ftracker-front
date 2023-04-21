import styles from './AccentLightButton.module.scss'

const AccentLightButton = ({content, onClick, disabled}) => {
  return (
      <div className={styles.button}>
        <button disabled={disabled} onClick={onClick}>{content}</button>
      </div>
  )
}

export {AccentLightButton}
