import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Loader } from '@mantine/core';
import styles from './VacancyPage.module.css';
import { VacancyCard } from '../VacancyCard/VacancyCard.tsx';
import type { Vacancy } from '../../types';

export const VacancyPage = () => {
  const { id } = useParams();
  const [vacancy, setVacancy] = useState<Vacancy | null>(null);
  const [companyDescription, setCompanyDescription] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVacancy = async () => {
      try {
        const res = await fetch(`https://api.hh.ru/vacancies/${id}`);
        const data = await res.json();
        setVacancy(data);

        if (data.employer?.id) {
          const companyRes = await fetch(`https://api.hh.ru/employers/${data.employer.id}`);
          const companyData = await companyRes.json();
          setCompanyDescription(companyData.description || null);
        }
      } catch (error) {
        console.error('Ошибка загрузки', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVacancy();
  }, [id]);

  if (loading) return <Loader />;
  if (!vacancy) return <div>Вакансия не найдена</div>;

  return (
    <div className={styles.container}>
      <VacancyCard vacancy={vacancy} />

      {vacancy.snippet?.responsibility && (
        <div className={styles.descriptionBlock}>
          <h2 className={styles.descriptionTitle}>Краткое описание</h2>
          <p className={styles.descriptionContent}>{vacancy.snippet.responsibility}</p>
        </div>
      )}
      {companyDescription && (
        <div className={styles.descriptionBlock}>
          <h2 className={styles.descriptionTitle}>О компании</h2>
          <div
            className={styles.descriptionContent}
            dangerouslySetInnerHTML={{ __html: companyDescription }}
          />
        </div>
      )}
    </div>
  );
};
