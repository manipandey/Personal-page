# Deploying your Portfolio to GitHub Pages (.io)

Since this is a fully static website (HTML, CSS, and JS), it can be hosted for **free** on GitHub Pages under your personal `.github.io` subdomain.

Here are the two ways to set this up:

---

## Option A: Root Domain (manipandey.github.io) — Recommended

This places your website directly at `https://manipandey.github.io/` (your primary portfolio root).

### Step 1: Create the GitHub Repository
1. Go to your GitHub account and create a **new public repository**.
2. Name the repository exactly: **`manipandey.github.io`**

### Step 2: Push your Local Code
Open your terminal inside the `/Users/manirajpandey/.gemini/antigravity-ide/scratch/personal_website` folder and run:

```bash
# Add the remote origin pointing to your new repo
git remote add origin https://github.com/manipandey/manipandey.github.io.git

# Push the code to the main branch
git push -u origin main
```

---

## Option B: Repo Subdirectory (manipandey.github.io/PROPTrade_Communit)

If you want to host it under the existing repository you linked:

### Step 1: Link and Push to your Existing Repo
Open your terminal inside the website folder and run:

```bash
# Add the remote origin pointing to your existing repo
git remote add origin https://github.com/manipandey/PROPTrade_Communit.git

# Push the code (Warning: this will push the site code to the main branch)
git push -u origin main --force
```

### Step 2: Enable GitHub Pages
1. Go to your **PROPTrade_Communit** repository on GitHub.
2. Click **Settings** (top menu bar) -> **Pages** (left sidebar).
3. Under **Build and deployment**:
   - Source: Select **Deploy from a branch**.
   - Branch: Select **`main`** and folder **`/ (root)`**.
4. Click **Save**.

Within 1-2 minutes, GitHub will build the site, and it will be live at:
`https://manipandey.github.io/PROPTrade_Communit/`
