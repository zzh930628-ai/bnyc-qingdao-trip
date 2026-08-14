# Static Export Preview

This project is configured for static export.

## Build the static site

```bash
npm install
npm run build
```

After build completes, Next.js writes the static site to:

```bash
./out
```

## Preview the exported site locally

```bash
npm run preview:static
```

Then open:

```bash
http://localhost:4321
```

## Notes

- Prefer previewing through a lightweight local server, not by double-clicking HTML files.
- Replace placeholder images in `public/images/` with final photography before formal launch.
