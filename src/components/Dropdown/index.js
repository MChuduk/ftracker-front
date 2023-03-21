import { useEffect, useRef, useState } from "react";
import styles from "./Dropdown.module.scss";

const Dropdown = ({ label, options, width }) => {
  const dropdownRef = useRef();
  const [selected, setSelected] = useState(options[0]);
  const [isOpened, setIsOpened] = useState(false);

  const onItemClickHandler = (item) => {
    setSelected(item);
    setIsOpened(false);
  };

  useEffect(() => {
    const closeDropdown = (e) => {
      if (e.target.parentNode !== dropdownRef.current) {
        setIsOpened(false);
      }
    };

    document.body.addEventListener("click", closeDropdown);

    return () => document.body.removeEventListener("click", closeDropdown);
  }, []);

  return (
    <div className={styles.dropdown}>
      {label && <label>{label}</label>}
      <div
        ref={dropdownRef}
        style={{ width }}
        onClick={() => setIsOpened((prev) => !prev)}
      >
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
    </div>
  );
};

export { Dropdown };
