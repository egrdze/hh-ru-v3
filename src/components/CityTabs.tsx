import { Tabs } from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';

export const CityTabs = () => {
  const navigate = useNavigate();
  const { city } = useParams();

  const handleTabChange = (value: string | null) => {
    if (!value) return;
    navigate(`/vacancies/${value}`);
  };

  return (
    <Tabs value={city || 'moscow'} onChange={handleTabChange}>
      <Tabs.List>
        <Tabs.Tab value="moscow">Москва</Tabs.Tab>
        <Tabs.Tab value="petersburg">Санкт-Петербург</Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
};
