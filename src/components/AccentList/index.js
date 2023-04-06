import styles from './AccentList.module.scss';

const AccentList = ({items}) => {
  return (
      <div className={styles.wrapper}>
        {items.map((item, index) =>
            <div key={index} className={styles.item}>
              {item.view}
            </div>
        )}
      </div>
  );
}

export {AccentList}