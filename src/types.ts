export type Vacancy = {
  id: string;
  name: string;
  employer: {
    name: string;
  };
  area: {
    name: string;
  };
  salary?: {
    from?: number;
    to?: number;
    currency: string;
  };
  experience: {
    name: string;
  };
  schedule: {
    name: string;
  };
  alternate_url: string;
};
