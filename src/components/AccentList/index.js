import styles from './AccentList.module.scss';

const AccentList = ({items}) => {
  return (
      <z className={styles.wrapper}>
        {items.map((item, index) =>
            <div key={index} className={styles.item}>
              {item.view}
            </div>
        )}
      </z>
  );
}

export {AccentList}
