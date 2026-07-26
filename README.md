# jupiterzw.github.io

Personal website and mathematics blog for Zhiyu Wang, built with
[Jekyll](https://jekyllrb.com/), the
[Chirpy](https://github.com/cotes2020/jekyll-theme-chirpy) theme, and GitHub
Pages.

## Repository structure

```text
.
├── .github/workflows/   # GitHub Pages build and deployment
├── _data/               # Contact and sharing data
├── _includes/           # Local overrides of Chirpy includes
├── _plugins/            # Custom Jekyll plugins
├── _posts/              # Blog posts
├── _sass/               # Theme snapshot and custom Sass partials
├── _tabs/               # About, archives, categories, and tags pages
├── assets/
│   ├── css/             # Jekyll Sass entry point
│   └── img/             # Post media, downloads, avatar, and favicons
├── _config.yml          # Site and build configuration
├── index.html           # Homepage collection entry point
├── Gemfile              # Ruby dependencies
├── Gemfile.lock         # Locked Ruby dependency versions
├── package.json         # Node build dependency metadata
└── package-lock.json    # Locked Node dependency versions
```

Chirpy supplies the layouts and JavaScript through the installed Ruby gem.
Local `_includes` files override only the parts of the theme that this site
customizes. The checked-in `_sass` tree preserves the site's current
appearance and should be reviewed carefully when upgrading Chirpy.

## Prerequisites

- Ruby 3
- Bundler
- Node.js 20 and npm

Install the dependencies:

```bash
bundle install
npm ci
```

Ruby provides Jekyll, Chirpy, and the HTML test tooling. Node provides
Bootstrap's Sass source for the custom theme build.

## Local development

Start the development server:

```bash
bundle exec jekyll serve
```

Open <http://127.0.0.1:4000/>. Jekyll watches the source files and rebuilds the
site after changes.

Build the production site:

```bash
JEKYLL_ENV=production bundle exec jekyll build
```

The generated site is written to `_site/`.

Run the same HTML validation used by GitHub Actions:

```bash
bundle exec htmlproofer _site \
  --disable-external \
  --check-html \
  --allow_hash_href
```

## Adding content

### New post

Create a Markdown file in `_posts/` using Jekyll's
`YYYY-MM-DD-short-title.md` naming convention:

```yaml
---
title: Post title
date: 2026-01-01 12:00
categories: [Posts, Mathematics]
tags: [example]
math: true
image: /assets/img/2026-01-01-short-title/preview.png
---
```

Post URLs are generated as `/posts/:title/`; changing that permalink setting
would break existing links.

Set `math: true` when the post contains LaTeX. Set `published: false` to keep a
draft-like post in the repository without including it in the production site.

### New page or tab

Create a Markdown file in `_tabs/` with an icon and navigation order:

```yaml
---
icon: fas fa-info-circle
order: 5
---
```

The filename becomes the default route, such as `_tabs/projects.md` becoming
`/projects/`.

### Images and downloads

- Store post images in `assets/img/YYYY-MM-DD-short-title/`.
- Keep preview images near the other media for the same post.
- Existing downloads remain under `assets/img/` to preserve their public URLs.
- For new non-image downloads, use `assets/files/<post-name>/` and link to
  `/assets/files/<post-name>/<file>`.
- Store the site avatar and favicons in their existing `assets/img` locations.

Use root-relative paths in front matter and Markdown, for example:

```markdown
![Description](/assets/img/2026-01-01-short-title/figure.png)
```

## Styling and theme overrides

- `assets/css/jekyll-theme-chirpy.scss` is the compiled stylesheet entry point.
- `_sass/custom/` contains site-specific styles.
- `_sass/addon`, `_sass/colors`, `_sass/layout`, and the main Sass files are
  the theme snapshot that preserves the current design.
- `_includes/` contains local Chirpy template overrides.

Avoid editing generated CSS or JavaScript under `_site/`.

## Deployment

Pushing to `main` or `master` runs
`.github/workflows/pages-deploy.yml`. The workflow:

1. installs Node dependencies with `npm ci`;
2. installs the locked Ruby dependencies;
3. builds the production Jekyll site;
4. validates the generated HTML;
5. uploads and deploys the GitHub Pages artifact.

README, license, and `.gitignore`-only changes do not trigger a deployment.

## Generated and local-only directories

These paths are generated or machine-specific and must not be committed:

- `_site/`
- `.jekyll-cache/`
- `.sass-cache/`
- `.bundle/`
- `vendor/`
- `node_modules/`
- editor configuration and temporary files
- operating-system metadata such as `.DS_Store`
