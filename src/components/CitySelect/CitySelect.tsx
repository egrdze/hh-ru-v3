import { IconMapPin } from '@tabler/icons-react'; // Иконка локации
import { useDispatch, useSelector } from 'react-redux';
import { Select } from '@mantine/core';
import type { RootState } from '../../store/store.ts';
import { setArea } from '../../store/vacanciesSlice.ts';
import styles from './CitySelect.module.css';

const cities = [
  { label: 'Все города', value: '' },
  { label: 'Москва', value: '1' },
  { label: 'Санкт-Петербург', value: '2' },
];

export const CitySelect = () => {
  const dispatch = useDispatch();
  const area = useSelector((state: RootState) => state.vacancies.area);

  return (
    <div className={styles.wrapper}>
      <Select
        data={cities}
        value={area}
        onChange={(value) => dispatch(setArea(value || ''))}
        placeholder="Все города"
        radius="md"
        size="md"
        leftSection={<IconMapPin size={18} color="#A0A0A0" />}
        leftSectionWidth={36}
        classNames={{
          input: styles.input,
          dropdown: styles.dropdown,
        }}
      />
    </div>
  );
};
