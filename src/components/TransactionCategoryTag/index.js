import styles from './TransactionCategory.module.scss';

const TransactionCategoryTag = ({category}) => {
  return (
      <div className={styles.wrapper} style={{background: category.color}}>
        {category.name}
      </div>
  );
}

export {TransactionCategoryTag}