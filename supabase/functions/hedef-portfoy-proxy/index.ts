import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Client-Info, Apikey",
};

const HEDEF_API_URL =
  "https://appapi.hedefportfoy.com.tr/tenant/ideal/getiriHesapla";
const HEDEF_API_KEY = Deno.env.get("HEDEFPORTFOY_API_KEY") || "";

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { fundCode, investment, period, startDate, endDate } =
      await req.json();

    if (!fundCode || investment == null || !period) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const res = await fetch(HEDEF_API_URL, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        "x-api-key": HEDEF_API_KEY,
      },
      body: JSON.stringify({
        fundCode,
        investment,
        period,
        startDate: startDate ?? null,
        endDate: endDate ?? null,
      }),
    });

    const json = await res.json();

    return new Response(JSON.stringify(json), {
      status: res.status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
