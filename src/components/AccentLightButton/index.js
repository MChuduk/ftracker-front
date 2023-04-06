import styles from './AccentLightButton.module.scss'

const AccentLightButton = ({content, onClick}) => {
  return (
      <div className={styles.button}>
        <button onClick={onClick}>{content}</button>
      </div>
  )
}

export {AccentLightButton}