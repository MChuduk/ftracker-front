import styles from './TransactionCategoryButton.module.scss';
import {HiHome} from "react-icons/hi";
import {MdCategory, MdFastfood, MdGames, MdSports, MdWork} from "react-icons/md";
import {FaBook, FaCar, FaCoins, FaUmbrellaBeach} from "react-icons/fa";
import {GiClothes} from "react-icons/gi";
import {BiHealth} from "react-icons/bi";

export function getIcon(icon, size, color = 'white') {
  const icons = {
    Home: <HiHome size={size} color={color}/>,
    Work: <MdWork size={size} color={color}/>,
    Education: <FaBook size={size} color={color}/>,
    Salary: <FaCoins size={size} color={color}/>,
    Clothes: <GiClothes size={size} color={color}/>,
    Car: <FaCar size={size} color={color}/>,
    Health: <BiHealth size={size} color={color}/>,
    Food: <MdFastfood size={size} color={color}/>,
    Games: <MdGames size={size} color={color}/>,
    Sport: <MdSports size={size} color={color}/>,
    Trips: <FaUmbrellaBeach size={size} color={color}/>,
  }
  return icons[icon] || <MdCategory size={size} color={color}/>;
}



const TransactionCategoryButton = ({category}) => {

  return <div className={styles.wrapper}>
    <center>
      <div className={styles.iconContainer}>
        <div className={styles.iconCircle} style={{backgroundColor: category.color}}>
          {getIcon(category.name, 30)}
        </div>
      </div>
    </center>
    <label>{category.name}</label>
  </div>
}

export {TransactionCategoryButton}
