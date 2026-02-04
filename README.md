# programming-course-student-works

Student works (static) for the Programming course.

This repository is intentionally separated from `programming-course-docs` to keep the course content repo small.

## Layout

- `works/<year>/<studentId>/...`
- `works/<year>/<studentId>/.../index.html` (the first `index.html` found is used)

## Publish

- GitHub Pages is deployed from `dist/` via Actions (`.github/workflows/deploy-pages.yml`).
- `works-index.json` is generated automatically on deploy and published at `/<base>/works-index.json`.
  - The course site reads this JSON to render the works list and build iframe URLs.

## Notes

- This repo contains large binary files. Consider Git LFS if it becomes a problem.
