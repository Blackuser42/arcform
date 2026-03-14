# Arcform — Blueprint Generator

> Turn any idea into a full SOP build blueprint in seconds.

---

## 🚀 Deploy to Vercel (10 minutes)

### Step 1 — Get Anthropic API Key
1. Go to https://console.anthropic.com
2. Create account (free)
3. Click **API Keys** → **Create Key**
4. Copy the key (starts with `sk-ant-...`)

### Step 2 — Upload to GitHub
1. Go to https://github.com → **New repository**
2. Name it `arcform`
3. Upload all these files (drag & drop or GitHub Desktop)

### Step 3 — Deploy on Vercel
1. Go to https://vercel.com → **Sign up with GitHub**
2. Click **Add New Project**
3. Select your `arcform` repository
4. Under **Environment Variables** add:
   - Key: `VITE_ANTHROPIC_API_KEY`
   - Value: your key from Step 1
5. Click **Deploy** ✅

### Step 4 — Custom Domain (optional)
1. In Vercel → your project → **Settings → Domains**
2. Add `arcform.app` (buy at namecheap.com ~$10/year)
3. Follow DNS instructions

---

## 🛍 Launch on Product Hunt

1. Go to https://producthunt.com → **Submit**
2. Fill in:
   - **Name:** Arcform
   - **Tagline:** Turn any idea into a build blueprint in seconds
   - **Description:** Paste the text below
   - **Link:** your Vercel URL
   - **Thumbnail:** screenshot of the app (1270x760px)

**Description to copy:**
```
Arcform takes your raw idea and generates a full SOP build blueprint — 
comparing Automation vs App vs Hybrid approaches, with sprint plans, 
risk registers, tech stack recommendations, and PDF export.

Perfect for founders, freelancers, and developers who want to go from 
"I have an idea" to a structured execution plan in under 60 seconds.
```

3. Best launch day: **Tuesday or Wednesday** (most traffic)
4. Tell friends to upvote between **12am–9am PST** (launch window)

---

## 💻 Local Development

```bash
# Install dependencies
npm install

# Copy env file and add your API key
cp .env.example .env.local

# Start dev server
npm run dev

# Open http://localhost:5173
```

---

## 📦 Tech Stack
- React 18 + Vite
- Anthropic Claude API (claude-sonnet-4)
- Pure CSS (no UI library)
- localStorage for history
- Browser Print API for PDF

---

Built with Arcform 🔴
