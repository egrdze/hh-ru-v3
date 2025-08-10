import { CiSearch } from 'react-icons/ci';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store/store.ts';
import { loadVacancies, setText } from '../../store/vacanciesSlice.ts';
import { useParams } from 'react-router-dom';
import styles from './TitleSearch.module.css';

const TitleSearch = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { city = 'moscow' } = useParams<{ city: string }>();
  const { text, skills, page } = useSelector((state: RootState) => state.vacancies);

  const handleSearch = () => {
    dispatch(loadVacancies({ city, text, skills, page }));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section>
      <div>
        <h1>Список вакансий</h1>
        <p>по профессии Frontend-разработчик</p>
      </div>
      <div className={styles.searchContainer}>
        <div className={styles.searchBox}>
          <CiSearch className={styles.iconSearch} />
          <input
            type="search"
            placeholder="Должность или название компании"
            value={text}
            onChange={(e) => dispatch(setText(e.target.value))}
            onKeyDown={handleKeyDown}
          />
        </div>
        <button className={styles.searchButton} onClick={handleSearch}>
          Найти
        </button>
      </div>
    </section>
  );
};

export default TitleSearch;
