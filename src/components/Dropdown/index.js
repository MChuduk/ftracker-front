import { useState } from "react";
import styles from "./Dropdown.module.scss";

const Dropdown = ({ options, width }) => {
  const [selected, setSelected] = useState(options[0]);
  const [isOpened, setIsOpened] = useState(false);

  const onClickHandler = () => {
    setIsOpened(!isOpened);
  };

  const onItemClickHandler = (item) => {
    setSelected(item);
    setIsOpened(false);
  };

  return (
    <div className={styles.dropdown} style={{ width }} onClick={onClickHandler}>
      <div className={styles.dropdownButton}>
        {selected}
        <div className={styles.carret} />
      </div>
      {isOpened && (
        <div className={styles.dropdownContent}>
          {options.map((option) => (
            <div
              className={styles.dropdownItem}
              onClick={() => onItemClickHandler(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export { Dropdown };
