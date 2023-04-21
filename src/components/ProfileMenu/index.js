import {useEffect, useRef, useState} from "react";
import styles from "./ProfileMenu.module.scss";

const ProfileMenu = ({name, options, width, contentWidth, onSelected }) => {
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
        <div
            ref={dropdownRef}
            style={{width}}
            onClick={() => setIsOpened((prev) => !prev)}
        >
          <div className={styles.dropdownButton} />
          {isOpened && (
              <div>
                <div className={styles.dropdownContent}
                     style={{width: contentWidth, marginLeft: -contentWidth + width}}>
                  {name && (
                      <div className={styles.dropdownItem + ' ' + styles.name}>
                        <strong>{name}</strong>
                      </div>)}
                  {options.map((option, index) => (
                      <div
                          key={index}
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

export {ProfileMenu};
