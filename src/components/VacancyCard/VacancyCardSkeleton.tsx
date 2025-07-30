import { Skeleton } from '@mantine/core';
import styles from './VacancyCard.module.css';

export const VacancyCardSkeleton = () => {
  return (
    <div className={styles.card} data-testid="vacancy-skeleton">
      <Skeleton height={24} width="60%" radius="sm" className={styles.title} />

      <div className={styles.sub}>
        <Skeleton height={16} width="40%" radius="sm" />
        <Skeleton height={16} width="30%" radius="sm" />
      </div>

      <Skeleton height={16} width="50%" radius="sm" className={styles.company} />
      <Skeleton height={12} width={120} radius="xl" />
      <Skeleton height={14} width="30%" radius="sm" className={styles.city} />

      <div className={styles.actions}>
        <Skeleton height={36} width={150} radius="md" />
        <Skeleton height={36} width={150} radius="md" />
      </div>
    </div>
  );
};
