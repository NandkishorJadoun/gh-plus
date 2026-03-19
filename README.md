# gh-plus

> Supercharge GitHub PR list with rich metadata right where you need it.

<img width="1544" height="797" alt="image" src="https://github.com/user-attachments/assets/af190c90-6ba8-43b3-a3a7-f1f8874f65cb" />

gh-plus enhances every card on GitHub's PR list page with:

- **Files changed**
- **Number of commits**
- **Additions** and **Deletions** as colored blocks

No more clicking into each PR just to get a basic sense of its size.

---

## Installation

gh-plus is not on the Chrome Web Store. You'll need to load it manually, it takes about 30 seconds.

**1. Clone and build**

```bash
git clone https://github.com/nandkishorjadoun/gh-plus
cd gh-plus
pnpm i
pnpm build
```

**2. Load into Chrome**

1. Go to `chrome://extensions`
2. Enable **Developer mode** (top right toggle)
3. Click **Load unpacked**
4. Select the `dist` folder inside the cloned repo

That's it. Navigate to any GitHub repo's PR list and you'll see the enhanced cards.

---

## GitHub Token (Recommended)

Without a token, the GitHub API allows **60 requests/hour** — enough for light use but easy to hit if you browse multiple repos.

Adding a Personal Access Token bumps this to **5,000 requests/hour**.

### Creating a token

1. Go to [github.com/settings/tokens](https://github.com/settings/tokens)
2. Click **Generate new token → Generate new token (classic)**
3. Give it a name like `gh-plus`
4. Under **Select scopes**, check only **`public_repo`**
5. Click **Generate token** and copy it immediately

> ⚠️ GitHub only shows the token once, copy it before leaving the page.

### Adding the token to gh-plus

1. Right-click the gh-plus extension icon in your toolbar
2. Click **Options**
3. Paste your token and click **Save**
4. Refresh any GitHub PR list page

You're set, no more rate limit errors.

---

## Support

If gh-plus saves you time, consider buying me a coffee ☕

[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-support-yellow?style=flat&logo=buy-me-a-coffee)](https://buymeacoffee.com/nandkishorjadoun)

---

## Contributing

PRs welcome. Fork, build, hack away.
