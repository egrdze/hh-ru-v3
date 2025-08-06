import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { fetchVacancies } from '../api/fetchVacancies';
import type { RootState } from './store';
import type { Vacancy } from '../types.ts';

interface VacanciesState {
  skills: string[];
  vacancies: Vacancy[];
  loading: boolean;
  error: string | null;
  page: number;
  text: string;
  area: string;
  totalPages: number;
}

const initialState: VacanciesState = {
  skills: ['TypeScript', 'React', 'Redux'],
  vacancies: [],
  loading: false,
  error: null,
  page: 0,
  text: '',
  area: '',
  totalPages: 0,
};

export const loadVacancies = createAsyncThunk('vacancies/load', async (_, { getState }) => {
  const state = getState() as RootState;
  const { skills, page, text, area } = state.vacancies;
  const query = text.trim() !== '' ? text : skills.join(' ');
  return await fetchVacancies({ page, text: query, area });
});

const vacanciesSlice = createSlice({
  name: 'vacancies',
  initialState,
  reducers: {
    addSkill(state, action: PayloadAction<string>) {
      const skill = action.payload.trim();
      if (skill && !state.skills.includes(skill)) {
        state.skills.push(skill);
      }
    },
    removeSkill(state, action: PayloadAction<string>) {
      state.skills = state.skills.filter((s) => s !== action.payload);
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setText(state, action: PayloadAction<string>) {
      state.text = action.payload;
    },
    setArea(state, action: PayloadAction<string>) {
      state.area = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadVacancies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadVacancies.fulfilled, (state, action) => {
        state.loading = false;
        state.vacancies = action.payload.items;
        state.totalPages = action.payload.pages;
      })
      .addCase(loadVacancies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки';
      });
  },
});

export const { addSkill, removeSkill, setPage, setText, setArea } = vacanciesSlice.actions;
export default vacanciesSlice.reducer;
