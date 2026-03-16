import "dotenv/config";
import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import { fileURLToPath } from "url";
import path from "path";
import db from "./db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || "3001", 10);

app.use(cors());
app.use(express.json());

const distPath = path.join(__dirname, "..", "dist");
app.use(express.static(distPath));

app.post("/api/submissions", (req, res) => {
  try {
    const { full_name, phone, email, city, user_type, rent_amount, consent_privacy, consent_data_processing } = req.body;

    if (!full_name || !phone || !email) {
      res.status(400).json({ error: "full_name, phone and email are required" });
      return;
    }

    const stmt = db.prepare(`
      INSERT INTO early_access_submissions (full_name, phone, email, city, user_type, rent_amount, consent_privacy, consent_data_processing)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      full_name,
      phone,
      email,
      city || "",
      user_type || "",
      rent_amount || "",
      consent_privacy ? 1 : 0,
      consent_data_processing ? 1 : 0
    );

    res.json({ success: true, id: result.lastInsertRowid });
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

app.post("/api/send-email", async (req, res) => {
  try {
    const smtpHost = process.env.SMTP_HOST || "";
    const smtpPort = parseInt(process.env.SMTP_PORT || "587", 10);
    const smtpUser = process.env.SMTP_USER || "";
    const smtpPass = process.env.SMTP_PASS || "";
    const smtpFrom = process.env.SMTP_FROM || "";
    const smtpTo = process.env.SMTP_TO || "";

    if (!smtpHost || !smtpUser || !smtpPass || !smtpFrom || !smtpTo) {
      res.status(200).json({ skipped: true, reason: "SMTP not configured" });
      return;
    }

    const { fullName, phone, email, city, userType, rentAmount } = req.body;

    if (!fullName || !phone || !email) {
      res.status(400).json({ error: "fullName, phone and email are required" });
      return;
    }

    const userTypeLabel = userType === "ev_sahibi" ? "Ev Sahibi" : userType === "kiraci" ? "Kiraci" : "-";

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
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: { user: smtpUser, pass: smtpPass },
    });

    await transporter.sendMail({
      from: smtpFrom,
      to: smtpTo,
      subject: `Yeni Erken Erisim Basvurusu: ${fullName}`,
      html: htmlBody,
    });

    res.json({ success: true });
  } catch (err) {
    console.error("SMTP Error:", err);
    res.status(500).json({ error: "Failed to send email" });
  }
});

app.post("/api/hedef-portfoy", async (req, res) => {
  try {
    const apiKey = process.env.HEDEFPORTFOY_API_KEY || "";
    const { fundCode, investment, period, startDate, endDate } = req.body;

    if (!fundCode || investment == null || !period) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const response = await fetch("https://appapi.hedefportfoy.com.tr/tenant/ideal/getiriHesapla", {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({
        fundCode,
        investment,
        period,
        startDate: startDate ?? null,
        endDate: endDate ?? null,
      }),
    });

    const json = await response.json();
    res.status(response.status).json(json);
  } catch (err) {
    console.error("Hedef Portfoy Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/submissions", (_req, res) => {
  try {
    const rows = db.prepare("SELECT * FROM early_access_submissions ORDER BY created_at DESC").all();
    res.json(rows);
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

app.get("/{*path}", (_req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
