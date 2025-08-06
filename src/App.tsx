import './App.css';
import '@mantine/core/styles.css';
import './components/Header/Header.module.css';
import { VacancyPage } from './components/VacancyPage/VacancyPage.tsx';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { CitySelect } from './components/CitySelect/CitySelect.tsx';
import Header from './components/Header/Header.tsx';
import { SkillsInput } from './components/SkillsInput/SkillsInput.tsx';
import TitleSearch from './components/TittleSearch/TitleSearch.tsx';
import { VacancyList } from './components/VacancyList/VacancyList.tsx';
import type { AppDispatch } from './store/store';
import { loadVacancies } from './store/vacanciesSlice';

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(loadVacancies());
  }, [dispatch]);

  return (
    <MantineProvider>
      <BrowserRouter>
        <Header />
        <TitleSearch />
        <Routes>
          <Route path="/vacancies/:id" element={<VacancyPage />} />
          <Route
            path="/"
            element={
              <div className="contentContainer">
                <div className="filters">
                  <SkillsInput />
                  <CitySelect />
                </div>
                <div className="vacancies">
                  <VacancyList />
                </div>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
