import supabase from "./client";

export async function getMetadata(url_link: string) {
  if (!url_link) return;

  const { data, error } = await supabase.functions.invoke("get-metadata", {
    body: {
      url: url_link,
    },
  });

  if (error) throw error;

  return data;
}
