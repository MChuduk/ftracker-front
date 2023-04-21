import styles from './AccentToolbar.module.scss';
const AccentToolbar = ({options, selectedOption, onSelectedOption}) => {
  return options ? (
      <div className={styles.wrapper}>
        {options.map((option, index) => (
            <div className={`${styles.toolbarItem} ${selectedOption === option ? styles.toolbarItemActive : ''}`}
                 key={index}
                 onClick={() => onSelectedOption(option, index)}>
              {option}
            </div>
        ))}
      </div>
  ) : null;
}

export {AccentToolbar}
