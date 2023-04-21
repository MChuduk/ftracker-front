import {useEffect, useRef, useState} from "react";
import styles from "./Dropdown.module.scss";

const Dropdown = ({label, name, options, width, contentWidth, onSelected, selected}) => {
  const dropdownRef = useRef();
  const [isOpened, setIsOpened] = useState(false);

  const onItemClickHandler = (item) => {
    onSelected(item);
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
            style={{width}}
            onClick={() => setIsOpened((prev) => !prev)}
        >
          <div className={styles.dropdownButton}>
            {selected}
            <div className={styles.carret}/>
          </div>
          {isOpened && (
              <div>
                <div className={styles.dropdownContent}
                     style={{width: contentWidth, marginLeft: -contentWidth + width}}>
                  {name && (
                      <div className={styles.dropdownItem + ' ' + styles.name}>
                        <strong>{name}</strong>
                        <svg
                            className={styles.close}
                            onClick={() => setIsOpened(false)}
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            width="20"
                            height="20"
                            viewBox="0 0 48 48"
                        >
                          <path
                              fill="#F44336"
                              d="M21.5 4.5H26.501V43.5H21.5z"
                              transform="rotate(45.001 24 24)"
                          ></path>
                          <path
                              fill="#F44336"
                              d="M21.5 4.5H26.5V43.501H21.5z"
                              transform="rotate(135.008 24 24)"
                          ></path>
                        </svg>
                      </div>)}
                  {options.map((option) => (
                      <div
                          className={styles.dropdownItem}
                          onClick={() => onItemClickHandler(option)}
                      >
                        {option}
                      </div>
                  ))}
                </div>
              </div>
          )}
        </div>
      </div>
  );
};

export {Dropdown};
