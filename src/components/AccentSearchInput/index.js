import styles from './AccentSearchInput.module.scss'

const AccentSearchInput = ({placeholder}) => {
  return <div className={styles.search}>
    <input className={styles.input} placeholder={placeholder}/>
  </div>
}

export {AccentSearchInput}