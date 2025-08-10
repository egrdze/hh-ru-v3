import './App.css';
import '@mantine/core/styles.css';
import './components/Header/Header.module.css';
import { VacancyPage } from './components/VacancyPage/VacancyPage.tsx';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import Header from './components/Header/Header.tsx';
import { SkillsInput } from './components/SkillsInput/SkillsInput.tsx';
import TitleSearch from './components/TittleSearch/TitleSearch.tsx';
import ErrorPage from './components/ErrorPage.tsx';
import { VacancyList } from './components/VacancyList/VacancyList.tsx';

function App() {


  return (
    <MantineProvider>
      <BrowserRouter>
        <Header />
        <TitleSearch />
        <Routes>
          <Route path="/vacancies/detail/:id" element={<VacancyPage />} />

          <Route
            path="/vacancies"
            element={
              <div className="contentContainer">
                <div className="filters">
                  <SkillsInput />
                </div>
                <div className="vacancies">
                  <Navigate to="/vacancies/moscow" replace />
                </div>
              </div>
            }
          />

          <Route
            path="/vacancies/:city"
            element={
              <div className="contentContainer">
                <div className="filters">
                  <SkillsInput />
                </div>
                <div className="vacancies">
                  <VacancyList />
                </div>
              </div>
            }
          />

          <Route path="/" element={<Navigate to="/vacancies/moscow" replace />} />

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
