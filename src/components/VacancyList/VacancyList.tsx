import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { loadVacancies, setPage, setText, setArea, addSkill, removeSkill } from '../../store/vacanciesSlice';
import type { AppDispatch, RootState } from '../../store/store';
import { VacancyCard } from '../VacancyCard/VacancyCard';
import { VacancyCardSkeleton } from '../VacancyCard/VacancyCardSkeleton';
import { Center, Pagination } from '@mantine/core';
import styles from './VacancyList.module.css';

export const VacancyList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { skills, page, text, area, vacancies, loading, error, totalPages } = useSelector(
    (state: RootState) => state.vacancies
  );

  const [searchParams, setSearchParams] = useSearchParams();

  const isSyncingFromUrl = useRef(false);

  useEffect(() => {
    if (isSyncingFromUrl.current) return;

    const urlText = searchParams.get('text') || '';
    const urlArea = searchParams.get('area') || '';
    const urlSkills = searchParams.getAll('skill_set');
    const urlPage = Number(searchParams.get('page')) || 0;

    if (urlText !== text) dispatch(setText(urlText));
    if (urlArea !== area) dispatch(setArea(urlArea));

    const skillsSet = new Set(skills);
    const urlSkillsSet = new Set(urlSkills);
    const isSkillsEqual =
      skills.length === urlSkills.length && [...skillsSet].every(skill => urlSkillsSet.has(skill));

    if (!isSkillsEqual) {
      skills.forEach(s => dispatch(removeSkill(s)));
      urlSkills.forEach(s => dispatch(addSkill(s)));
    }

    if (urlPage !== page) dispatch(setPage(urlPage));

    isSyncingFromUrl.current = true;
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();

    if (text) params.set('text', text);
    if (area) params.set('area', area);
    skills.forEach(skill => params.append('skill_set', skill));
    if (page !== 0) params.set('page', String(page));

    const newParamsStr = params.toString();
    const currentParamsStr = searchParams.toString();

    if (newParamsStr !== currentParamsStr) {
      setSearchParams(params, { replace: true });
    }
  }, [text, area, skills, page, setSearchParams, searchParams]);

  // Загружаем вакансии при изменении фильтров и пагинации
  useEffect(() => {
    dispatch(loadVacancies());
  }, [dispatch, text, area, skills, page]);


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

  return (
    <div className={styles.list}>
      {vacancies.map((vacancy) => (
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
