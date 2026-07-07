import type { ArticleType, FetchArticlesOptions } from "../../types/post.types";
import supabase from "./client";

export async function getAllArticles() {
  const { data, error } = await supabase.from("articles").select("*");

  if (error) throw error;

  return data;
}

export async function getArticles(options: FetchArticlesOptions = {}) {
  const page = options.page ?? 1;
  const pageSize = options.pageSize ?? 20;

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase.from("articles").select(
    `
      *,
      publisher:publishers (*),
      images:article_images (*),
      journalists:article_journalists (*)
    `,
    { count: "exact" },
  );

  if (options.type) {
    query = query.eq("type", options.type);
  }

  if (options.publisherId) {
    query = query.eq("publisher_id", options.publisherId);
  }

  query = query
    .order("date", { ascending: options.sort === "oldest" })
    .range(from, to);

  const { data, error, count } = await query;

  if (error) throw error;

  return {
    articles: data ?? [],
    count: count ?? 0,
    page,
    pageSize,
    totalPages: Math.ceil((count ?? 0) / pageSize),
  };
}

export async function createArticle(article: {
  link: string;
  title: string;
  description: string;
  date: string;
  subscription: boolean;
  type?: ArticleType;
  imgLink?: string;
  publisher_id?: string;
}) {
  const { imgLink, publisher_id, ...articleData } = article;
  console.log(article);

  const { data, error } = await supabase
    .from("articles")
    .insert({
      ...articleData,
      publisher_id,
    })
    .select("*")
    .single();

  if (error) throw error;

  if (imgLink) {
    const { error: imageError } = await supabase.from("article_images").insert({
      article_id: data.id,
      image: imgLink,
    });

    if (imageError) throw imageError;
  }

  return data;
}
