# 🚢 Deployment Guide — Shree Samarth Krupa Diagnostic Centre

This guide covers deploying:
- **Frontend** to [Vercel](https://vercel.com)
- **Backend** to [Render](https://render.com)
- **Database** to [Railway](https://railway.app)

---

## Step 1: Deploy Database to Railway

1. Go to [railway.app](https://railway.app) and sign up
2. Click **New Project** → **MySQL**
3. Once provisioned, go to the MySQL service → **Connect** tab
4. Copy the connection credentials:
   - `MYSQL_HOST`
   - `MYSQL_PORT`
   - `MYSQL_USER`
   - `MYSQL_PASSWORD`
   - `MYSQL_DATABASE`
5. Connect to Railway MySQL using a client (TablePlus, DBeaver, or CLI):
   ```bash
   mysql -h <MYSQL_HOST> -P <MYSQL_PORT> -u <MYSQL_USER> -p <MYSQL_DATABASE> < server/database.sql
   ```
6. Import the `database.sql` file to create all tables and seed data

---

## Step 2: Deploy Backend to Render

### 2.1 Prepare Repository

Make sure your code is pushed to GitHub.

### 2.2 Create Render Web Service

1. Go to [render.com](https://render.com) and sign up
2. Click **New** → **Web Service**
3. Connect your GitHub repository
4. Configure:
   - **Name**: `shree-samarth-krupa-api`
   - **Root Directory**: `server`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Plan**: Free (or Starter for better performance)

### 2.3 Set Environment Variables on Render

In your Render service → **Environment** tab, add:

```
NODE_ENV=production
PORT=10000
DB_HOST=<Railway MySQL Host>
DB_PORT=<Railway MySQL Port>
DB_USER=<Railway MySQL User>
DB_PASSWORD=<Railway MySQL Password>
DB_NAME=shree_samarth_krupa
JWT_SECRET=<generate a strong 64-char random string>
JWT_EXPIRES_IN=7d
FRONTEND_URL=https://your-vercel-domain.vercel.app
UPLOAD_PATH=uploads/
```

Generate a strong JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 2.4 Important Notes for Render

- Uploads folder will be ephemeral on Render free tier. For production, migrate to **Cloudinary** or **AWS S3**.
- Add a `render.yaml` for infrastructure-as-code (optional):

```yaml
services:
  - type: web
    name: shree-samarth-krupa-api
    runtime: node
    rootDir: server
    buildCommand: npm install
    startCommand: node server.js
    envVars:
      - key: NODE_ENV
        value: production
```

---

## Step 3: Deploy Frontend to Vercel

### 3.1 Install Vercel CLI (optional)

```bash
npm i -g vercel
```

### 3.2 Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and sign up
2. Click **New Project** → Import your GitHub repo
3. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### 3.3 Set Environment Variables on Vercel

In your Vercel project → **Settings** → **Environment Variables**:

```
VITE_API_URL=https://your-render-api.onrender.com/api
VITE_WHATSAPP_NUMBER=918169686040
```

### 3.4 Add vercel.json for SPA routing

Create `client/vercel.json`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

## Step 4: Update CORS on Backend

Once you have your Vercel URL, update the `FRONTEND_URL` env var on Render to match your Vercel domain.

---

## Step 5: Post-Deployment Checklist

- [ ] Database imported successfully
- [ ] Backend API responding at `/api/settings`
- [ ] Frontend loads without errors
- [ ] Admin login works at `/admin/login`
- [ ] **CHANGE ADMIN PASSWORD** immediately!
- [ ] Test appointment booking form
- [ ] Test WhatsApp integration
- [ ] Test gallery upload
- [ ] Verify Google Maps embeds
- [ ] Check mobile responsiveness
- [ ] Verify dark mode

---

## 🔒 Security Checklist

- [ ] Strong JWT_SECRET (64+ chars)
- [ ] Changed default admin password
- [ ] HTTPS enabled (Vercel + Render both provide this)
- [ ] CORS restricted to your Vercel domain
- [ ] Rate limiting active
- [ ] No sensitive data in client code
- [ ] MySQL user has minimum required permissions

---

## 📈 Performance Optimization

### Vercel
- Enable Vercel Edge Network (automatic)
- Set `Cache-Control` headers for static assets

### Render
- Upgrade to paid plan to prevent cold starts
- Enable auto-deploy on push

### Images
For production, replace Multer disk storage with Cloudinary:
```bash
npm install cloudinary multer-storage-cloudinary
```

---

## 🔄 CI/CD

Both Vercel and Render auto-deploy on git push to `main` branch when connected to GitHub.

Recommended branch strategy:
- `main` → Production
- `develop` → Staging
- `feature/*` → Development

---

## 📞 Support

Contact the developer if you encounter issues during deployment.
