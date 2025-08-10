import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, useParams } from 'react-router-dom';
import {
  loadVacancies,
  setPage,
  setText,
  addSkill,
  removeSkill,
} from '../../store/vacanciesSlice';
import type { AppDispatch, RootState } from '../../store/store';
import { VacancyCard } from '../VacancyCard/VacancyCard';
import { VacancyCardSkeleton } from '../VacancyCard/VacancyCardSkeleton';
import { Center, Pagination } from '@mantine/core';
import styles from './VacancyList.module.css';
import { CityTabs } from '../CityTabs.tsx';

export const VacancyList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { city = 'moscow' } = useParams();

  const { skills, page, text, vacancies, loading, error, totalPages } = useSelector(
    (state: RootState) => state.vacancies
  );

  const [searchParams, setSearchParams] = useSearchParams();

  const skillsRef = useRef<string[]>(skills);
  const pageRef = useRef<number>(page);
  const textRef = useRef<string>(text);

  const isSyncingFromUrl = useRef(false);
  const isSyncingFromState = useRef(false);

  useEffect(() => {
    skillsRef.current = skills;
    pageRef.current = page;
    textRef.current = text;
  }, [skills, page, text]);

  useEffect(() => {
    if (isSyncingFromState.current) {
      isSyncingFromState.current = false;
      return;
    }

    isSyncingFromUrl.current = true;

    const urlText = searchParams.get('text') || '';
    const urlSkills = searchParams.getAll('skill_set');
    const urlPage = Number(searchParams.get('page')) || 0;

    if (urlSkills.length === 0 && skillsRef.current.length > 0) {
      const params = new URLSearchParams(searchParams);
      skillsRef.current.forEach(skill => params.append('skill_set', skill));
      setSearchParams(params, { replace: true });
      isSyncingFromUrl.current = false;
      return;
    }

    if (urlText !== textRef.current) dispatch(setText(urlText));

    const skillsSet = new Set(skillsRef.current);
    const urlSkillsSet = new Set(urlSkills);
    const isSkillsEqual =
      skillsRef.current.length === urlSkills.length &&
      [...skillsSet].every(skill => urlSkillsSet.has(skill));

    if (!isSkillsEqual) {
      skillsRef.current.forEach(s => dispatch(removeSkill(s)));
      urlSkills.forEach(s => dispatch(addSkill(s)));
    }

    if (urlPage !== pageRef.current) dispatch(setPage(urlPage));
  }, [dispatch, searchParams, setSearchParams]);

  useEffect(() => {
    if (isSyncingFromUrl.current) {
      isSyncingFromUrl.current = false;
      return;
    }

    isSyncingFromState.current = true;

    const params = new URLSearchParams();

    if (text) params.set('text', text);
    skills.forEach(skill => params.append('skill_set', skill));
    if (page !== 0) params.set('page', String(page));

    const newParamsStr = params.toString();
    const currentParamsStr = searchParams.toString();

    if (newParamsStr !== currentParamsStr) {
      setSearchParams(params, { replace: true });
    }
  }, [text, skills, page, setSearchParams, searchParams]);

  useEffect(() => {
    dispatch(loadVacancies({ city, text, skills, page }));
  }, [dispatch, city, text, skills, page]);

  if (loading) {
    return (
      <div className={styles.list}>
        <CityTabs />
        {Array.from({ length: 5 }).map((_, i) => (
          <VacancyCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <div className={styles.filtersInline}>
        <CityTabs />
      </div>

      <div className={styles.list}>
        {vacancies.map(vacancy => (
          <VacancyCard key={vacancy.id} vacancy={vacancy} />
        ))}
      </div>

      <Center mt="xl">
        <Pagination
          total={totalPages}
          value={page + 1}
          onChange={value => dispatch(setPage(value - 1))}
          withEdges
        />
      </Center>
    </div>
  );
};
