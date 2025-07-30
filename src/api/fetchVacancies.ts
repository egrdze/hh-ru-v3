export const fetchVacancies = async ({
  text = '',
  area = '',
  skills = [],
  page = 0,
}: {
  text?: string;
  area?: string;
  skills?: string[];
  page?: number;
}) => {
  const url = new URL('https://api.hh.ru/vacancies');
  url.searchParams.set('industry', '7');
  url.searchParams.set('professional_role', '96');
  url.searchParams.set('per_page', '10');
  url.searchParams.set('page', String(page));
  if (text) url.searchParams.set('text', text);
  if (area) url.searchParams.set('area', area);
  skills.forEach((s) => url.searchParams.append('skill_set', s));

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error('Ошибка загрузки');
  return res.json();
};
