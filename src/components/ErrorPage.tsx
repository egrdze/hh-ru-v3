import { useNavigate } from 'react-router-dom';
import styles from './ErrorPage.module.css';


function ErrorPage() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/vacancies/moscow');
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.hero}>
          <div>
          <h2 className={styles.title}>Упс! Такой страницы не существует</h2>
          <p className={styles.subtitle}>Давайте перейдём к началу.</p>
          </div>
          <button className={styles.button} onClick={goHome}>
            На главную
          </button>
        </div>

        <div className={styles.gifContainer}>
          <div className={styles.gifWrapper}>
            <img
              src="https://media1.tenor.com/m/baBulgRz6XkAAAAd/sad-cat.gif"
              alt="Sad cat"
              className={styles.gif}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
