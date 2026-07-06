export const ARTICLE_TYPES = [
  "Kronikk",
  "Artikkel",
  "Anmeldelse",
  "Intervju"
] as const;

export type ArticleType = (typeof ARTICLE_TYPES)[number];

export type Article = {
  id: string;
  title: string;
  description: string;
  type: ArticleType;
  date: string; // ISO date string
  subscription: boolean;
  publisher_id: string;
  link: string;
};

export type Publisher = {
  id: string;
  title: string;
  logo: string;
};

export type ArticleImage = {
  id: string;
  article_id: string;
  image: string;
  photographer: string;
  alt: string;
};

export type ArticleJournalist = {
  id: string;
  article_id: string;
  name: string;
};

export type ArticleWithRelations = Article & {
  publisher: Publisher | null;
  images: ArticleImage[];
  journalists: ArticleJournalist[];
};

export type FetchArticlesOptions = {
  type?: string;
  publisherId?: string;
  sort?: "newest" | "oldest";
  page?: number;
  pageSize?: number;
};

export type FetchArticleResponse<T> = {
  articles: T[];
  count: number;
  page: number;
  pageSize: number;
  totalPages: number;
};
