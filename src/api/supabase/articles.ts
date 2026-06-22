
import supabase from "./client";

export async function getArticles() {
  const { data, error } = await supabase
    .from("articles")
    .select("*");

  if (error) throw error;

  return data;
}