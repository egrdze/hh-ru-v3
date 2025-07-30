import { FaUserCircle } from 'react-icons/fa';
import hhLogo from '../../assets/hhLogo.svg';
import styles from './Header.module.css';

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.headerLeft}>
        <img src={hhLogo} alt="hh logo" className={styles.logo} />
      </div>
      <div className={styles.headerRight}>
        <span className={styles.navItem}>
          Вакансии FE <span className={styles.blueDot} />
        </span>
        <span className={styles.navItem}>
          <FaUserCircle className={styles.userIcon} />
          Обо мне
        </span>
      </div>
    </div>
  );
};

export default Header;
