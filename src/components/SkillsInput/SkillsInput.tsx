import { useState } from 'react';
import { IconPlus } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { Pill } from '@mantine/core';
import type { RootState } from '../../store/store.ts';
import { addSkill, removeSkill } from '../../store/vacanciesSlice.ts';
import styles from './SkillsInput.module.css';

export const SkillsInput = () => {
  const skills = useSelector((state: RootState) => state.vacancies.skills);
  const dispatch = useDispatch();
  const [input, setInput] = useState('');

  const handleAdd = () => {
    const trimmed = input.trim();
    if (trimmed && !skills.includes(trimmed)) {
      dispatch(addSkill(trimmed));
    }
    setInput('');
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>Ключевые навыки</div>

      <div className={styles.inputRow}>
        <input
          type="text"
          placeholder="Навык"
          value={input}
          onChange={(e) => setInput(e.currentTarget.value)}
          onKeyDown={handleKeyDown}
          className={styles.input}
        />
        <button onClick={handleAdd} className={styles.addButton}>
          <IconPlus size={14} />
        </button>
      </div>

      <div className={styles.pills}>
        {skills.map((skill) => (
          <Pill
            key={skill}
            withRemoveButton
            onRemove={() => dispatch(removeSkill(skill))}
            color="gray"
            size="sm"
            radius="xl"
          >
            {skill}
          </Pill>
        ))}
      </div>
    </div>
  );
};
