# CV PDF generator

Genera `cristian-urbano-en.pdf` y `cristian-urbano-es.pdf` (A4, una página) en la raíz del repo.

```bash
python3 tools/cv/build.py
```

- Requiere macOS (`sips`) y Google Chrome; necesita internet para cargar Google Fonts.
- El contenido vive en `DATA` dentro de `build.py` (versión condensada del sitio, EN y ES). Si cambia el texto del sitio, actualizarlo ahí y volver a correr.
- Los links (LinkedIn, GitHub) están en la plantilla `page()`.
- Los PDFs también se publican en el artifact "Cristian Urbano" (claude.ai); después de regenerarlos, republicar el artifact con los PDFs nuevos.
