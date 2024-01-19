type AiredInfo = {
  from: string;
  to: string;
};

type BroadcastInfo = {
  day: string;
  time: string;
  timezone: string;
};

type DemographicInfo = {
  mal_id: number;
  type: string;
  name: string;
  url: string;
};

type ImageInfo = {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
};

type ProducerInfo = {
  mal_id: number;
  type: string;
  name: string;
  url: string;
};

type TrailerInfo = {
  youtube_id: string;
  url: string;
  embed_url: string;
  images: ImageInfo;
};

export type AnimeInfo = {
  airing: boolean;
  approved: boolean;
  background: null | string;
  broadcast: BroadcastInfo;
  demographics: DemographicInfo[];
  duration: string;
  episodes: number;
  explicit_genres: string[];
  favorites: number;
  genres: DemographicInfo[] | string;
  images: { jpg: ImageInfo; webp: ImageInfo };
  licensors: ProducerInfo[];
  mal_id: number;
  members: number;
  popularity: number;
  producers: ProducerInfo[];
  rank: number;
  rating: string;
  score: number;
  scored_by: number;
  season: string;
  source: string;
  status: string;
  studios: ProducerInfo[];
  synopsis: string;
  themes: DemographicInfo[];
  title: string;
  title_english: string;
  title_japanese: string;
  title_synonyms: string[];
  titles: { [key: string]: any }[]; // Assuming the titles structure is an array of objects
  trailer: TrailerInfo;
  type: string;
  url: string;
  year: number | string;
};

interface AnimeSerial {
  blocked_countries: string[];
  blocked_seasons: Record<string, unknown>;
  camrip: boolean;
  created_at: string;
  episodes_count: number;
  id: string;
  imdb_id: string;
  kinopoisk_id: string;
  last_episode: number;
  last_season: number;
  lgbt: boolean;
  link: string;
  other_title: string;
  quality: string;
  screenshots: string[];
  shikimori_id: string;
  title: string;
  title_orig: string;
  translation: Translation;
  type: string;
  updated_at: string;
  worldart_link: string;
  year: number;
}
