import supabase from "./client";

export async function getPublishers() {
  const { data, error } = await supabase
    .from("publishers")
    .select("*");

  if (error) throw error;

  return data;
}