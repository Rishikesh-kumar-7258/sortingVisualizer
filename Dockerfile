# Static site (plain HTML/CSS/JS, no build step) — served by nginx.
FROM nginx:1.27-alpine

COPY index.html /usr/share/nginx/html/index.html
COPY static/ /usr/share/nginx/html/static/

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --spider http://localhost/ || exit 1
