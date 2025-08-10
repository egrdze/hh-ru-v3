import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { fetchVacancies } from '../api/fetchVacancies';
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

const cityToAreaMap: Record<string, string> = {
  moscow: '1',
  petersburg: '2',
};

export const loadVacancies = createAsyncThunk(
  'vacancies/load',
  async (
    { city, text, skills, page }: { city: string; text: string; skills: string[]; page: number },
    { rejectWithValue }
  ) => {
    try {
      const area = cityToAreaMap[city] || '';
      const query = text.trim() !== '' ? text : skills.join(' ');
      return await fetchVacancies({ page, text: query, area, skills });
    } catch  {
      return rejectWithValue('Ошибка загрузки');
    }
  }
);


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

export const { addSkill, removeSkill, setPage, setText } = vacanciesSlice.actions;
export default vacanciesSlice.reducer;
