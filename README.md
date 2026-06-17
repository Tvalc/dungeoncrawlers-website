# Dungeon Crawlers TV — marketing site

Static landing page for **dungeoncrawlers.tv**. Deployed with **GitHub Pages** (GitHub Actions), same pattern as [sector-scavengers-website](../sector-scavengers-website).

**Live site:** https://dungeoncrawlers.tv/

## What you have

- `index.html` — coming-soon landing page (watch + crowd participation pitch)
- `styles.css` — torchlit dungeon / CRT TV theme
- `assets/` — logo + Open Graph cover
- `CNAME` — custom domain for GitHub Pages

## DNS (Cloudflare)

Point `dungeoncrawlers.tv` at GitHub Pages with **DNS only** (gray cloud, not proxied):

| Type  | Name | Value           |
|-------|------|-----------------|
| A     | @    | 185.199.108.153 |
| A     | @    | 185.199.109.153 |
| A     | @    | 185.199.110.153 |
| A     | @    | 185.199.111.153 |
| CNAME | www  | tvalc.github.io |

GitHub repo **Settings → Pages** → Custom domain: `dungeoncrawlers.tv` → Enforce HTTPS.

## Local preview

```bash
npm run preview
```

Open http://127.0.0.1:4175/

## Next steps

- Swap the placeholder email form for Buttondown, Mailchimp, or Formspree
- Add a `/live` route when the interactive participation UI is ready
- Wire Twitch/YouTube embed on the homepage when you have a channel URL
