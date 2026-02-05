# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a Jekyll-based engineering blog that appears to be in early development. The site uses Jekyll's static site generation capabilities with Ruby/Bundler for dependency management.

## Theme

The site uses the **Chirpy theme** (`jekyll-theme-chirpy ~> 7.4`). Theme configuration is in both `Gemfile` and `_config.yml`. Layouts and includes come from the Chirpy gem; override by creating same-named files locally.

## Common Development Commands

```bash
# Install dependencies (run this first if Gemfile.lock doesn't exist)
bundle install

# Run local development server (default: http://localhost:4000)
bundle exec jekyll serve

# Run with drafts visible
bundle exec jekyll serve --drafts

# Build the static site (output to _site/)
bundle exec jekyll build

# Build for production
JEKYLL_ENV=production bundle exec jekyll build
```

## Project Structure

Key directories and their purposes:
- `_posts/`: Blog posts in format `YYYY-MM-DD-title.md`
- `_drafts/`: Draft posts (visible with `--drafts` flag)
- `_tabs/`: Navigation tabs (about, archives, categories, tags)
- `assets/img/`: Avatar and favicon images
- `scripts/`: Build utilities (favicon generation)

## Creating New Content

### Blog Posts
Create files in `_posts/` with format: `YYYY-MM-DD-title-with-hyphens.md`

Required front matter:
```yaml
---
title: "Your Post Title"
date: YYYY-MM-DD HH:MM:SS +/-TTTT
categories: [category1, category2]
tags: [tag1, tag2]
---
```

## Theme Customization

The Chirpy theme provides layouts, includes, and assets via the gem. To customize:
1. Override theme files by creating same-named files in local directories
2. Site-wide settings are in `_config.yml` (title, tagline, avatar, social links, etc.)
3. Navigation tabs live in `_tabs/` with Chirpy-specific front matter (icon, order)

## Jekyll Plugin Architecture

Configured plugins (in _config.yml):
- jekyll-paginate
- jekyll-sitemap
- jekyll-gist
- jekyll-feed
- jemoji
- jekyll-include-cache

These are loaded via the jekyll-plugins group in Gemfile.

## Development Considerations

1. **No test suite**: This Jekyll blog has no automated tests
2. **GitHub Pages**: Deployment configured via GitHub Actions (`.github/`)
3. **Image assets**: Favicons generated via `scripts/generate-icons.js` from source image using Sharp
4. **Theme assets**: Most styling and layouts come from the Chirpy theme gem