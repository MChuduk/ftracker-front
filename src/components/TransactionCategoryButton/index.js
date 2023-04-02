import styles from './TransactionCategoryButton.module.scss';


const TransactionCategoryButton = ({category}) => {
  return <div className={styles.wrapper}>
    <center>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="60" height="60">
        <circle cx="14" cy="14" r="14" fill={category.color} fillRule="evenodd"></circle>
        <path fill="#fff" d={category.svgPath}></path>
      </svg>
    </center>
    <label>{category.name}</label>
  </div>
}

export {TransactionCategoryButton}