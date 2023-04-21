import styles from './AccentGroup.module.scss';

const AccentGroup = ({items}) => {
  return (
      <div className={styles.wrapper}>
        {items.map((item, index) => (
            <div style={{display: 'flex', flexDirection: 'column'}} key={index}>
              <label className={styles.label}>
                <div className={styles.circle}/>
                {item.groupName}
              </label>
              <div className={styles.view}>
                {item.view}
              </div>
            </div>
        ))}
      </div>
  );
}

export {AccentGroup}
