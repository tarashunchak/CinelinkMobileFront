export interface Credit_I {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string;
  deathday: string | null;
  gender: number;
  homepage: string;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string;
};

export interface CreditInfo_I {
  id: number;
  name: string;
  original_name: string;
  imdb_id: string;
  birthday: string;
};
