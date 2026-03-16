import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import nodemailer from "npm:nodemailer@6.9.16";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Client-Info, Apikey",
};

const SMTP_HOST = Deno.env.get("SMTP_HOST") || "";
const SMTP_PORT = parseInt(Deno.env.get("SMTP_PORT") || "587", 10);
const SMTP_USER = Deno.env.get("SMTP_USER") || "";
const SMTP_PASS = Deno.env.get("SMTP_PASS") || "";
const SMTP_FROM = Deno.env.get("SMTP_FROM") || "";
const SMTP_TO = Deno.env.get("SMTP_TO") || "muhammet.unlu@2sworks.com";

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  userType: string;
  rentAmount: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !SMTP_FROM) {
      return new Response(
        JSON.stringify({ error: "SMTP not configured" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const { fullName, phone, email, city, userType, rentAmount }: FormData =
      await req.json();

    if (!fullName || !phone || !email) {
      return new Response(
        JSON.stringify({ error: "fullName, phone and email are required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const userTypeLabel =
      userType === "ev_sahibi"
        ? "Ev Sahibi"
        : userType === "kiraci"
          ? "Kiraci"
          : "-";

    const htmlBody = `
      <h2>Yeni Erken Erisim Basvurusu</h2>
      <table style="border-collapse:collapse;width:100%;max-width:500px;">
        <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Ad Soyad</td><td style="padding:8px;border-bottom:1px solid #eee;">${fullName}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Telefon</td><td style="padding:8px;border-bottom:1px solid #eee;">${phone}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">E-Posta</td><td style="padding:8px;border-bottom:1px solid #eee;">${email}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Sehir</td><td style="padding:8px;border-bottom:1px solid #eee;">${city || "-"}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Kullanici Tipi</td><td style="padding:8px;border-bottom:1px solid #eee;">${userTypeLabel}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Kira Tutari</td><td style="padding:8px;border-bottom:1px solid #eee;">${rentAmount ? rentAmount + " TL" : "-"}</td></tr>
      </table>
    `;

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: SMTP_FROM,
      to: SMTP_TO,
      subject: `Yeni Erken Erisim Basvurusu: ${fullName}`,
      html: htmlBody,
    });

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("SMTP Error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to send email" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
