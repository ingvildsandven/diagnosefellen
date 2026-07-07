const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { url } = await req.json();

    if (!url) {
      return Response.json(
        { error: "Missing url" },
        { status: 400, headers: corsHeaders }
      );
    }

    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    const html = await response.text();

    const getMeta = (key: string) => {
      const regex = new RegExp(
        `<meta[^>]+(?:property|name)=["']${key}["'][^>]+content=["']([^"']+)["']`,
        "i"
      );
      return html.match(regex)?.[1] ?? null;
    };

    const title =
      getMeta("og:title") ||
      html.match(/<title[^>]*>(.*?)<\/title>/i)?.[1] ||
      null;

    return Response.json(
      {
        title,
        description: getMeta("og:description"),
        image: getMeta("og:image"),
        siteName: getMeta("og:site_name"),
        publishedTime: getMeta("article:published_time"),
        author: getMeta("author"),
        url,
      },
      { headers: corsHeaders }
    );
  } catch (error) {
    return Response.json(
      { error: String(error) },
      { status: 500, headers: corsHeaders }
    );
  }
});