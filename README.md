# Kiram Landing Page

Kiram erken erisim landing page uygulamasi. React (Vite) frontend + Express.js backend tek container icinde sunulur.

---

## Mimari

```
[Browser] --> [Express.js :3001]
                  |
                  ├── /            --> Static React SPA (dist/)
                  ├── /api/submissions     --> SQLite DB (early access form kayitlari)
                  ├── /api/send-email      --> SMTP ile bildirim maili
                  └── /api/hedef-portfoy   --> Hedef Portfoy dis API proxy
```

- **Frontend:** React 18 + Vite + TailwindCSS (build sirasinda `dist/` klasorune derlenir)
- **Backend:** Express.js (Node 22), TypeScript, `tsx` runtime ile calisir
- **Veritabani:** SQLite (better-sqlite3), dosya tabanli, `/app/data/kiram.db`
- **E-posta:** Nodemailer (SMTP)

---

## Docker ile Calistirma

### Image Build

```bash
docker build -t kiram-lp .
```

### Container Calistirma

```bash
docker run -d \
  --name kiram-lp \
  -p 3001:3001 \
  -v kiram-data:/app/data \
  --env-file .env \
  kiram-lp
```

### Onemli Notlar

- **Port:** Container icinde `3001` portunu dinler. `PORT` env degiskeni ile degistirilebilir.
- **Volume:** SQLite veritabani `/app/data/` altinda olusturulur. Container yeniden olusturulursa veri kaybolmamasi icin bu dizin **mutlaka volume olarak mount edilmelidir**.
- **Multi-stage build:** Dockerfile iki asamalidir. Ilk asamada frontend build edilir, ikinci asamada sadece production dependency'leri ile minimal image olusturulur.

---

## Environment Variables

Container calistirilirken asagidaki environment variable'lar saglanmalidir. `.env` dosyasi image'a **dahil degildir** (guvenlik geregi `.dockerignore` ile dislanmistir).

| Degisken | Zorunlu | Aciklama |
|---|---|---|
| `PORT` | Hayir | Server portu (varsayilan: `3001`) |
| `HEDEFPORTFOY_API_KEY` | Evet | Hedef Portfoy API erisim anahtari |
| `SMTP_HOST` | Hayir | SMTP sunucu adresi (bos ise mail gonderilmez) |
| `SMTP_PORT` | Hayir | SMTP portu (varsayilan: `587`) |
| `SMTP_USER` | Hayir | SMTP kullanici adi |
| `SMTP_PASS` | Hayir | SMTP sifresi |
| `SMTP_FROM` | Hayir | Gonderici e-posta adresi |
| `SMTP_TO` | Hayir | Bildirim alacak e-posta adresi |

> SMTP degiskenleri bos birakilirsa e-posta gonderimi atlanir, uygulama hata vermez.

---

## API Endpointleri

| Method | Path | Aciklama |
|---|---|---|
| `POST` | `/api/submissions` | Erken erisim basvuru formu kaydi |
| `GET` | `/api/submissions` | Tum basvurulari listele |
| `POST` | `/api/send-email` | SMTP ile bildirim e-postasi gonder |
| `POST` | `/api/hedef-portfoy` | Hedef Portfoy getiri hesapla API proxy |
| `GET` | `/*` | React SPA (frontend) |

---

## Veritabani

- **Teknoloji:** SQLite 3 (better-sqlite3, WAL mode)
- **Dosya yolu:** `/app/data/kiram.db`
- **Schema:** Uygulama baslarken otomatik olusturulur (`server/schema.sql`)
- **Tablo:** `early_access_submissions`

```sql
CREATE TABLE IF NOT EXISTS early_access_submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  city TEXT DEFAULT '',
  user_type TEXT DEFAULT '',
  rent_amount TEXT DEFAULT '',
  consent_privacy INTEGER NOT NULL DEFAULT 0,
  consent_data_processing INTEGER NOT NULL DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);
```

> Container restart'larinda veri kaybini onlemek icin `/app/data` dizini icin **persistent volume** kullanilmalidir.

---

## Health Check

Basit bir health check icin:

```bash
curl http://localhost:3001/api/submissions
```

200 donerse uygulama ayaktadir.

---

## Lokal Gelistirme

```bash
npm install
npm start        # Express + Vite dev server paralel calisir
```

- Frontend: `http://localhost:5173` (Vite dev server, API istekleri 3001'e proxy edilir)
- Backend: `http://localhost:3001`

---

## Dosya Yapisi

```
.
├── Dockerfile
├── .dockerignore
├── .env                  # Ornek env dosyasi (gizli bilgi icermez)
├── package.json
├── vite.config.ts
├── index.html
├── server/
│   ├── index.ts          # Express.js ana sunucu
│   ├── db.ts             # SQLite baglantisi
│   └── schema.sql        # Veritabani schema
├── src/                  # React frontend kaynak kodlari
│   ├── index.tsx
│   ├── components/
│   ├── screens/
│   ├── hooks/
│   ├── lib/
│   └── img/
├── dist/                 # Build ciktisi (git'te yok, build sirasinda olusur)
└── data/                 # SQLite veritabani dosyalari (volume ile mount edilmeli)
```
