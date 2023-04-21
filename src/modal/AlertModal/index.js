import styles from './AlertModal.module.scss';
import {AccentLightButton} from "../../components/AccentLightButton";

const AlertModal = ({active, setActive, content, onSubmit}) => {
  return (
      <div className={active ? `${styles.modal} ${styles.active}` : styles.modal} onClick={() => setActive(false)}>
        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
          {content}
          <div className={styles.buttons}>
            <AccentLightButton content="Continue" onClick={() => onSubmit(true)} />
            <AccentLightButton content="Cancel" onClick={() => onSubmit(false)}/>
          </div>
        </div>
      </div>
  );
}

export {AlertModal};
