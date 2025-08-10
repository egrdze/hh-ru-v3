import { Button } from '@mantine/core';
import type { Vacancy } from '../../types.ts';
import styles from './VacancyCard.module.css';
import { Link } from 'react-router-dom';


type TagType = 'remote' | 'hybrid' | 'office';

const scheduleKeywords: { keyword: string; label: string; type: TagType }[] = [
  { keyword: 'удал', label: 'МОЖНО УДАЛЁННО', type: 'remote' },
  { keyword: 'remote', label: 'МОЖНО УДАЛЁННО', type: 'remote' },
  { keyword: 'гибрид', label: 'ГИБРИД', type: 'hybrid' },
  { keyword: 'hybrid', label: 'ГИБРИД', type: 'hybrid' },
  { keyword: 'гибридный формат', label: 'ГИБРИД', type: 'hybrid' },
  { keyword: 'частично удаленно', label: 'ГИБРИД', type: 'hybrid' },
  { keyword: 'офис', label: 'ОФИС', type: 'office' },
  { keyword: 'на месте работодателя', label: 'ОФИС', type: 'office' },
  { keyword: 'на территории работодателя', label: 'ОФИС', type: 'office' },
  { keyword: 'в офисе', label: 'ОФИС', type: 'office' },
  { keyword: 'office', label: 'ОФИС', type: 'office' },
  { keyword: 'полный день', label: 'ОФИС', type: 'office' },
];

type Props = {
  vacancy: Vacancy;
};

export const VacancyCard = ({ vacancy }: Props) => {
  const { name, employer, salary, experience, area, schedule } = vacancy;

  const salaryText = salary
    ? `${salary.from?.toLocaleString?.() || ''} – ${salary.to?.toLocaleString?.() || ''} ₽`
    : 'Зарплата не указана';

  const scheduleName = schedule?.name?.toLowerCase().trim() || '';

  const tags = scheduleKeywords.reduce<{ label: string; type: TagType }[]>((acc, item) => {
    if (scheduleName.includes(item.keyword) && !acc.find((t) => t.type === item.type)) {
      acc.push({ label: item.label, type: item.type });
    }
    return acc;
  }, []);

  return (
    <div className={styles.card} data-testid="vacancy-card">
      <h2 className={styles.title} data-testid="vacancy-title">
        {name}
      </h2>

      <div className={styles.sub}>
        <span className={styles.salary} data-testid="vacancy-salary">
          {salaryText}
        </span>
        <span className={styles.exp} data-testid="vacancy-exp">
          {experience?.name}
        </span>
      </div>

      <div className={styles.company} data-testid="vacancy-company">
        {employer.name}
      </div>

      {tags.length > 0 && (
        <div className={styles.tags} data-testid="vacancy-tags">
          {tags.map((tag) => (
            <span
              key={tag.type}
              className={styles[`tag_${tag.type}`]}
              data-testid={`tag-${tag.type}`}
            >
              {tag.label}
            </span>
          ))}
        </div>
      )}

      <div className={styles.city} data-testid="vacancy-city">
        {area.name}
      </div>

      <div className={styles.actions}>
        <a href={vacancy.alternate_url} target="_blank" rel="noopener noreferrer">
          <Button color="dark" radius="md" data-testid="view-btn">
            Смотреть вакансию
          </Button>
        </a>
        <Link to={`/vacancies/detail/${vacancy.id}`}>
          <Button
            variant="default"
            radius="md"
            data-testid="apply-btn"
          >
            Откликнуться
          </Button>
        </Link>
    </div>
</div>
)
  ;
};
