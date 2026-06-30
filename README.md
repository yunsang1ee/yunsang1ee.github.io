# Behind the Frame

Astro 기반 GitHub Pages 블로그입니다. 글과 프로젝트는 Markdown Content Collections로 관리합니다.

## Writing

블로그 글은 `src/content/posts/*.md`에 작성합니다.

```md
---
title: "글 제목"
description: "목록과 SEO에 쓰이는 짧은 설명"
pubDate: 2026-06-30
category: "graphics-programming"
tags:
  - DXR
  - Path Tracing
series:
  slug: "real-time-path-tracing"
  title: "Real-Time Path Tracing"
  order: 1
type: "note"
featured: false
pinned: false
draft: false
---

본문은 Markdown으로 작성합니다.
```

프로젝트는 `src/content/projects/*.md`에 작성합니다.

## Development

```bash
npm install
npm run dev
```

PowerShell 실행 정책 때문에 `npm`이 막히면 다음처럼 실행합니다.

```bash
npm.cmd run dev
```

## Build

```bash
npm.cmd run build
```

## Deploy

`main` 브랜치에 push하면 `.github/workflows/deploy.yml`이 GitHub Pages로 배포합니다.
