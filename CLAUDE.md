# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a Jekyll-based engineering blog that appears to be in early development. The site uses Jekyll's static site generation capabilities with Ruby/Bundler for dependency management.

## Important Configuration Note

There's a theme configuration conflict that needs resolution:
- `Gemfile` specifies: `jekyll-theme-chirpy ~> 7.0`
- `_config.yml` specifies: `remote_theme: "mmistakes/minimal-mistakes-jekyll@4.26.2"`

When making theme-related changes, ensure consistency between these files.

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
- `_tabs/`: Navigation tabs (about, archives, categories, tags)
- `_pages/`: Additional pages
- `_data/`: YAML data files for navigation, contacts, sharing
- `assets/css/`: Custom styling (style.scss)

## Creating New Content

### Blog Posts
Create files in `_posts/` with format: `YYYY-MM-DD-title-with-hyphens.md`

Required front matter:
```yaml
---
layout: post
title: "Your Post Title"
date: YYYY-MM-DD HH:MM:SS +/-TTTT
categories: [category1, category2]
tags: [tag1, tag2]
author: default
---
```

### Pages
Add to `_pages/` or root directory with appropriate front matter:
```yaml
---
layout: page
title: "Page Title"
permalink: /custom-url/
---
```

## Theme Customization

The site currently has conflicting theme configurations. When working with themes:
1. Choose either Chirpy or Minimal Mistakes theme
2. Update both Gemfile and _config.yml accordingly
3. Theme-specific layouts and includes come from the gem/remote theme
4. Override theme files by creating same-named files in local directories

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
2. **No CI/CD**: Deployment is likely manual or via GitHub Pages
3. **Missing .gitignore**: Consider adding one for `_site/`, `.sass-cache/`, `.jekyll-cache/`, `vendor/`, `Gemfile.lock` (if not tracking)
4. **Theme assets**: Most styling and layouts come from the chosen theme gem