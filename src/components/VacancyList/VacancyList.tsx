import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Center, Pagination } from '@mantine/core';
import type { AppDispatch, RootState } from '../../store/store.ts';
import { loadVacancies, setPage } from '../../store/vacanciesSlice.ts';
import type { Vacancy } from '../../types.ts';
import { VacancyCard } from '../VacancyCard/VacancyCard.tsx';
import { VacancyCardSkeleton } from '../VacancyCard/VacancyCardSkeleton.tsx';
import styles from './VacancyList.module.css';

export const VacancyList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { vacancies, loading, error, page, skills, area, text } = useSelector(
    (state: RootState) => state.vacancies
  );

  useEffect(() => {
    dispatch(loadVacancies());
  }, [dispatch, page, skills, area, text]);

  if (loading) {
    return (
      <div className={styles.list}>
        {Array.from({ length: 5 }).map((_, i) => (
          <VacancyCardSkeleton key={i} />
        ))}
      </div>
    );
  }
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  const totalPages = 10;

  return (
    <div className={styles.list}>
      {vacancies.map((vacancy: Vacancy) => (
        <VacancyCard key={vacancy.id} vacancy={vacancy} />
      ))}

      <Center mt="xl">
        <Pagination
          total={totalPages}
          value={page + 1}
          onChange={(value) => dispatch(setPage(value - 1))}
          withEdges
        />
      </Center>
    </div>
  );
};
