import { serve } from "https://deno.land/std/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { email, eventType, date, content } = await req.json();

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Booking <onboarding@resend.dev>",
        to: ["ingvild.sandven@gmail.com"],
        reply_to: email,
        subject: `Ny bookingforespørsel: ${eventType}`,
        html: `
          <h2>Ny bookingforespørsel</h2>
          <p><strong>Fra:</strong> ${email}</p>
          <p><strong>Type:</strong> ${eventType}</p>
          <p><strong>Dato:</strong> ${date}</p>
          <p>${content}</p>
        `,
      }),
    });

    const data = await res.json();

    return new Response(JSON.stringify(data), {
      status: res.status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});